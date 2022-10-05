package routes

import (
	"context"
	"log"
	"strconv"
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
	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var result models.Record
		err := cur.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		results = append(results, result)
	}

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
	curTo, err := collection.Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
	}
	defer curTo.Close(ctx)
	currFrom, err := database.Collection(currencyFrom).Find(ctx, filter)
	if err != nil {
		log.Fatal(err)
	}
	defer currFrom.Close(ctx)
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

func GetWMQY(c *gin.Context) {
	dateTo, err := time.Parse("2006-01-02", c.Query("dateto"))
	if err != nil {
		log.Fatal(err)
	}

	n_count := c.Query("n_count")
	if n_count == "" {
		n_count = "1"
	}
	n, err := strconv.Atoi(n_count)
	if err != nil {
		c.JSON(200, gin.H{
			"error": "n_count must be an integer",
		})
		return
	}
	// n_count should be a number

	type_wmqy := c.Query("type")
	var dateFrom time.Time
	if type_wmqy == "W" {
		dateFrom = dateTo.AddDate(0, 0, -7*n)
	} else if type_wmqy == "M" {
		dateFrom = dateTo.AddDate(0, -1*n, 0)
	} else if type_wmqy == "Q" {
		dateFrom = dateTo.AddDate(0, -3*n, 0)
	} else if type_wmqy == "Y" {
		dateFrom = dateTo.AddDate(-1*n, 0, 0)
	} else {
		c.JSON(200, gin.H{
			"error": "type should be W, M, Q or Y",
		})
		return
	}
	currencyTo := c.Query("currencyTo")
	currencyFrom := c.Query("currencyFrom")
	results := TwoCurrDataRange(currencyTo, currencyFrom, dateFrom, dateTo)
	c.JSON(200, gin.H{
		"results": results,
	})
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
