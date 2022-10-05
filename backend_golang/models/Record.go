package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Record struct {
	id    primitive.ObjectID `bson:"_id,omitempty"`
	Date  time.Time          `json:"date"`
	Value float64            `json:"value"`
}
