import os
import datetime
from pymongo import MongoClient
from pymongo.database import Database
from flask import Flask
from flask_restful import request

from flask_cors import CORS

from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})


def get_creds():
    load_dotenv(dotenv_path="../.env")
    mongo_id = os.getenv("MONGO_ID")
    mongo_password = os.getenv("MONGO_PASSWORD")
    return mongo_id, mongo_password


def init_db(mongo_id, mongo_password):
    client = MongoClient(
        f"mongodb+srv://viewer:{mongo_password}@currency-cluster.sgrcewj.mongodb.net/?retryWrites=true&w=majority"
    )
    db = client["northerntrust"]
    return db


def get_data_for_date(db: Database, date: str, currency_from: str, currency_to: str):
    """
    params:
        db: Database, date: str, currency_from: str, currency_to: str

    Get data for a specific date,
    if currency_from is USD, then return the value of currency_to
    else return the value of currency_to / currency_from

    """
    date = datetime.datetime.strptime(date, "%Y-%m-%d")

    if currency_from == "USD":
        try:
            value = db[currency_to].find_one({"date": date})["value"]
        except TypeError:
            value = None
    else:

        try:
            # get value of "currency_from" in USD
            value_from = db[currency_from].find_one({"date": date})["value"]
        except TypeError:
            return None
        try:
            # get value of "currency_to" in USD
            value_to = db[currency_to].find_one({"date": date})["value"]
        except TypeError:
            return None

        # calculate value of "currency_from" in "currency_to"
        value = value_to / value_from

    return value


def get_value_in_date_range(
    db: Database, date_begin: str, date_end: str, currency_from: str, currency_to: str
):
    """
    params:
        db: Database, date_begin: str, date_end: str, currency_from: str, currency_to: str

    Get data for a specific date range, if currency_from is USD, then return the value of currency_to
    else return the value of currency_to / currency_from

    """
    try:
        date_begin = datetime.datetime.strptime(date_begin, "%Y-%m-%d")
        date_end = datetime.datetime.strptime(date_end, "%Y-%m-%d")
    except ValueError:
        return None

    if date_begin > date_end:
        return None

    if currency_from == "USD":
        try:
            values = db[currency_to].find(
                {"date": {"$gte": date_begin, "$lte": date_end}}
            )

            values = [i for i in values]
            for value in values:
                del value["_id"]

        except TypeError as e:
            values = None

    else:

        try:
            values_from = db[currency_from].find(
                {"date": {"$gte": date_begin, "$lte": date_end}}
            )
            values_to = db[currency_to].find(
                {"date": {"$gte": date_begin, "$lte": date_end}}
            )
        except TypeError:
            return None

        values_from = [i for i in values_from]
        values_to = [i for i in values_to]

        for value in values_from:
            del value["_id"]
        for value in values_to:
            del value["_id"]

        values = []
        for i in range(len(values_from)):
            try:
                value = values_to[i]["value"] / values_from[i]["value"]
            except ZeroDivisionError:
                value = None
            values.append({"date": values_from[i]["date"], "value": value})

    return values


def get_wmqy_data(db, wmqy, currency_to, currency_from, startdate):
    """
    params:
        db: Database, wmqy: str, currency_to: str, currency_from: str, startdate: str
        if wmqy is "w" then return the value of currency_to in the last week
        if wmqy is "m" then return the value of currency_to in the last month
        if wmqy is "q" then return the value of currency_to in the last quarter
        if wmqy is "y" then return the value of currency_to in the last year
    """
    if wmqy == "w":
        date_end = datetime.datetime.strptime(startdate, "%Y-%m-%d")
        date_begin = date_end - datetime.timedelta(days=7)
    elif wmqy == "m":
        date_end = datetime.datetime.strptime(startdate, "%Y-%m-%d")
        date_begin = date_end - datetime.timedelta(days=30)
    elif wmqy == "q":
        date_end = datetime.datetime.strptime(startdate, "%Y-%m-%d")
        date_begin = date_end - datetime.timedelta(days=90)
    elif wmqy == "y":
        date_end = datetime.datetime.strptime(startdate, "%Y-%m-%d")
        date_begin = date_end - datetime.timedelta(days=365)
    else:
        return None

    date_end = datetime.datetime.strftime(date_end, "%Y-%m-%d")
    date_begin = datetime.datetime.strftime(date_begin, "%Y-%m-%d")

    return get_value_in_date_range(db, date_begin, date_end, currency_from, currency_to)


@app.route("/", methods=["GET"])
def something():
    return "Hello World"


@app.route("/are_you_up", methods=["GET", "POST"])
def are_you_up() -> str:
    """
    Check if the server is up
    """
    return "yes"


@app.route("/get_data_onDate", methods=["POST"])
def get_data() -> dict:
    """
    Get data for a specific date
    """

    global db

    params = request.get_json()
    data = get_data_for_date(
        db, params["date"], params["currency_from"], params["currency_to"]
    )
    # make response
    response = {"data": data}
    return response


@app.route("/get_data_inDateRange", methods=["POST"])
def get_data_in_date_range() -> dict:
    """
    Get data for a specific date range
    """
    print(request.get_json())
    global db
    params = request.get_json()
    data = get_value_in_date_range(
        db,
        params["date_begin"],
        params["date_end"],
        params["currency_from"],
        params["currency_to"],
    )
    # make response
    response = {"data": data}
    print(response)
    return response


@app.route("/get_wmqy", methods=["GET", "POST"])
def get_wmqy() -> dict:
    """
    Get weekly, monthly, quarterly, yearly data starting from a specific date range
    """
    global db
    params = request.get_json()
    data = get_wmqy_data(
        db,
        params["wmqy"],
        params["currency_to"],
        params["currency_from"],
        params["date"],
    )
    # make response
    response = {"data": data}
    return response


if __name__ == "__main__":
    mongo_id, mongo_password = get_creds()
    db = init_db(mongo_id, mongo_password)
    app.run(host="0.0.0.0", port=5000, debug=True)
