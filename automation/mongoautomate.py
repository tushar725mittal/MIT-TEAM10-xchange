from pymongo import MongoClient, errors
import pandas as pd
import json
from dotenv import load_dotenv
import os


def get_creds():
    load_dotenv(dotenv_path="../.env")
    mongo_id = os.getenv("MONGO_ID")
    mongo_password = os.getenv("MONGO_PASSWORD")
    return mongo_id, mongo_password


def load_merged():
    df = pd.read_csv("../data/merged.csv")
    df = df.set_index("Date")
    df.index = pd.to_datetime(df.index)
    return df


def get_currency_dict(df):
    with open("../data/currencies.json", "r") as f:
        currencies = json.load(f)
    return currencies


def init_db(mongo_id, mongo_password):
    client = MongoClient(
        f"mongodb+srv://viewer:{mongo_password}@currency-cluster.sgrcewj.mongodb.net/?retryWrites=true&w=majority"
    )
    db = client["northerntrust"]
    return db


def insert_data(db, df, currencies):
    existing_collections = db.list_collection_names()
    for column in df.columns:
        print(column)
        # check if the column exists
        if column not in existing_collections:
            collection = db[column]
            # insert data
            # collection.insert_many(df[column].to_dict("records"))
            items = df[column].to_dict().items()
            for item in items:
                collection.insert_one({"date": item[0], "value": item[1]})
            collection.create_index("date")
        else:
            print(f"Collection {column} already exists")


def main():
    mongo_id, mongo_password = get_creds()
    df = load_merged()
    currencies = get_currency_dict(df)
    db = init_db(mongo_id, mongo_password)
    insert_data(db, df, currencies)


if __name__ == "__main__":
    main()
