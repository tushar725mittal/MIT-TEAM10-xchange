package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type record struct {
	id    primitive.ObjectID `bson:"_id,omitempty"`
	Date  time.Time          `json:"date"`
	Value float64            `json:"value"`
}

func LoadDotENV() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func GetMongoIDPassword() (string, string) {
	LoadDotENV()
	mongoID := os.Getenv("MONGO_ID")
	mongoPassword := os.Getenv("MONGO_PASSWORD")
	return mongoID, mongoPassword
}

func ConnectToServer() *mongo.Database {
	mongoID, mongoPassword := GetMongoIDPassword()
	// connect to server
	serverAPIOptions := options.ServerAPI(options.ServerAPIVersion1)
	clientOptions := options.Client().
		ApplyURI("mongodb+srv://" + mongoID + ":" + mongoPassword + "@currency-cluster.sgrcewj.mongodb.net/?retryWrites=true&w=majority").
		SetServerAPIOptions(serverAPIOptions)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	// check the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB!")
	return client.Database("northerntrust")

}

var database = ConnectToServer()

func getSingleCurrDataFromRange(c *gin.Context) {
	dateFrom, err := time.Parse("2006-01-02", c.Query("datefrom"))
	if err != nil {
		log.Fatal(err)
	}
	dateTo, err := time.Parse("2006-01-02", c.Query("dateto"))
	if err != nil {
		log.Fatal(err)
	}
	currency := c.Query("currency")
	results := singleCurrDataRange(currency, dateFrom, dateTo)
	c.JSON(200, gin.H{
		"results": results,
	})

}

func singleCurrDataRange(currency string, dateFrom time.Time, dateTo time.Time) []record {
	filter := bson.M{"date": bson.M{"$gte": dateFrom, "$lte": dateTo}}
	var results []record
	collection := database.Collection(currency)
	cur, err := collection.Find(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	for cur.Next(ctx) {
		var result record
		err := cur.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		results = append(results, result)
	}
	fmt.Println(results)
	return results
}

func getTwoCurrFromDateRange(c *gin.Context) {
	dateFrom, err := time.Parse("2006-01-02", c.Query("datefrom"))
	if err != nil {
		log.Fatal(err)
	}
	dateTo, err := time.Parse("2006-01-02", c.Query("dateto"))
	if err != nil {
		log.Fatal(err)
	}
	currencyTo := c.Query("currencyTo")
	currencyFrom := c.Query("currencyFrom")
	results := twoCurrDataRange(currencyTo, currencyFrom, dateFrom, dateTo)
	c.JSON(200, gin.H{
		"results": results,
	})
}

func twoCurrDataRange(currencyTo string, currencyFrom string, dateFrom time.Time, dateTo time.Time) []record {
	filter := bson.M{"date": bson.M{"$gte": dateFrom, "$lte": dateTo}}
	ctx := context.Background()
	collection := database.Collection(currencyTo)
	curTo, err := collection.Find(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}
	currFrom, err := database.Collection(currencyFrom).Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
	}
	var resultFrom []record
	var resultTo []record
	for curTo.Next(ctx) {
		var result record
		err := curTo.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		resultTo = append(resultTo, result)
	}
	for currFrom.Next(ctx) {
		var result record
		err := currFrom.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		resultFrom = append(resultFrom, result)
	}
	j_prev := 0

	var finalResult []record

	for i := 0; i < len(resultTo); i++ {
		for j := j_prev; j < len(resultFrom); j++ {
			if resultTo[i].Date == resultFrom[j].Date {
				val1 := (resultTo[i].Value)
				val2 := (resultFrom[j].Value)
				finalResult = append(finalResult, record{Date: resultTo[i].Date, Value: val1 / val2})
				j_prev = j
				break
			}
		}
	}
	return finalResult

}

func getAllCollections(c *gin.Context) {
	ctx := context.Background()
	collections, err := database.ListCollectionNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, gin.H{
		"collections": collections,
	})
}

func main() {
	// connect to server

	router := gin.Default()
	router.GET("/collections", getAllCollections)
	router.GET("/getSingleCurrFromDateRange", getSingleCurrDataFromRange)
	// link to test: http://localhost:8080/getSingleCurrFromDateRange?currency=USD&datefrom=2020-01-01&dateto=2020-01-31
	router.GET("/getTwoCurrFromDateRange", getTwoCurrFromDateRange)
	// link to test the api
	// http://localhost:8080/getTwoCurrFromDateRange?currencyTo=USD&currencyFrom=EUR&datefrom=2020-01-01&dateto=2020-01-02

	router.Run(":8080")
}
