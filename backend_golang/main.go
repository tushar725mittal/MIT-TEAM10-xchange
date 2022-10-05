package main

import (
	"backend_golang/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// connect to server

	router := gin.Default()
	router.GET("/collections", routes.GetAllCollections)
	router.GET("/getSingleCurrFromDateRange", routes.GetSingleCurrDataFromRange)
	// link to test: http://localhost:8080/getSingleCurrFromDateRange?currency=USD&datefrom=2020-01-01&dateto=2020-01-31
	router.GET("/getTwoCurrFromDateRange", routes.GetTwoCurrFromDateRange)
	// link to test the api
	// http://localhost:8080/getTwoCurrFromDateRange?currencyTo=USD&currencyFrom=EUR&datefrom=2020-01-01&dateto=2020-01-02

	router.Run(":8080")
}
