package routes

import (
	"context"
	"fmt"
	"log"
	"time"

	"backend_golang/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

var database = ConnectToServer()

func GetSingleCurrDataFromRange(c *gin.Context) {
	dateFrom, err := time.Parse("2006-01-02", c.Query("datefrom"))
	if err != nil {
		log.Fatal(err)
	}
	dateTo, err := time.Parse("2006-01-02", c.Query("dateto"))
	if err != nil {
		log.Fatal(err)
	}
	currency := c.Query("currency")
	results := SingleCurrDataRange(currency, dateFrom, dateTo)
	c.JSON(200, gin.H{
		"results": results,
	})

}

func SingleCurrDataRange(currency string, dateFrom time.Time, dateTo time.Time) []models.Record {
	filter := bson.M{"date": bson.M{"$gte": dateFrom, "$lte": dateTo}}
	var results []models.Record
	collection := database.Collection(currency)
	cur, err := collection.Find(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	for cur.Next(ctx) {
		var result models.Record
		err := cur.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		results = append(results, result)
	}
	fmt.Println(results)
	return results
}

func GetTwoCurrFromDateRange(c *gin.Context) {
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
	results := TwoCurrDataRange(currencyTo, currencyFrom, dateFrom, dateTo)
	c.JSON(200, gin.H{
		"results": results,
	})
}

func TwoCurrDataRange(currencyTo string, currencyFrom string, dateFrom time.Time, dateTo time.Time) []models.Record {
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
	var resultFrom []models.Record
	var resultTo []models.Record
	for curTo.Next(ctx) {
		var result models.Record
		err := curTo.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		resultTo = append(resultTo, result)
	}
	for currFrom.Next(ctx) {
		var result models.Record
		err := currFrom.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		resultFrom = append(resultFrom, result)
	}
	j_prev := 0

	var finalResult []models.Record

	for i := 0; i < len(resultTo); i++ {
		for j := j_prev; j < len(resultFrom); j++ {
			if resultTo[i].Date == resultFrom[j].Date {
				val1 := (resultTo[i].Value)
				val2 := (resultFrom[j].Value)
				finalResult = append(finalResult, models.Record{Date: resultTo[i].Date, Value: val1 / val2})
				j_prev = j
				break
			}
		}
	}
	return finalResult

}

func GetAllCollections(c *gin.Context) {
	ctx := context.Background()
	collections, err := database.ListCollectionNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, gin.H{
		"collections": collections,
	})
}
