import datetime
from pymongo import MongoClient
from pymongo.database import Database
from flask import Flask, request


app = Flask(__name__)


def init_db() -> MongoClient:
    client = MongoClient("localhost", 27017)
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
        except TypeError:
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

        values = []
        for value_from, value_to in zip(values_from, values_to):
            value = value_to["value"] / value_from["value"]
            values.append(value)
    return list(values)


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
    db = init_db()
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
    return response


if __name__ == "__main__":
    db = init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
