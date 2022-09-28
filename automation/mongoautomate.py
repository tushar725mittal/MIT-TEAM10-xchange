from pymongo import MongoClient, errors
import pandas as pd
import json


def load_merged():
    df = pd.read_csv("../data/merged.csv")
    df = df.set_index("Date")
    df.index = pd.to_datetime(df.index)
    return df


def get_currency_dict(df):
    with open("../data/currencies.json", "r") as f:
        currencies = json.load(f)

    return currencies


def init_db():
    client = MongoClient("localhost", 27017)
    db = client["northerntrust"]
    return db


def insert_data(db, df, currencies):
    for column in df.columns:
        print(column)
        # create collection for that column
        collection = db[column]
        # insert data
        # collection.insert_many(df[column].to_dict("records"))
        items = df[column].to_dict().items()
        for item in items:
            collection.insert_one({"date": item[0], "value": item[1]})
        collection.create_index("date")


def main():
    df = load_merged()
    currencies = get_currency_dict(df)
    db = init_db()
    insert_data(db, df, currencies)


if __name__ == "__main__":
    main()
