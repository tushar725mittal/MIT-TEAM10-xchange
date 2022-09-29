#  Exchange Rate Visualiser 
## [For Northern Trust Summer Internship hackathon]


This is a simple web app that visualises the exchange rate between two currencies over time. It uses the CSV data provided in the email. The data is stored in ./data folder. 

The app is built using Flask, ReactJS and MongoDB.

## How to run

### 1. Install dependencies

For the flask App : 
```
pip install -r requirements.txt
```

For the React App : 
```
npm install
```

## Setup keys for mongodb by saving the below lines to env in project root folder
```
MONGO_ID = reader_publicacc
MONGO_PASSWORD = exCiDmgJof6YekT3
```
Note : The above keys have reading permissions only [Writing permissions are required for mongoautomate.py only] 

The flask api is also depl

- Automation folder contains the python script for extracting, cleaning and merging data from csv files into a common csv.

- ```mongoautomate.py``` is a python script that automates the process of inserting data into MongoDB. It is run using ```python mongoautomate.py```

- ```./backend/backend.py``` is the flask app that serves the end points for the React App.

The Tests for the flask app are in ```./backend/backend_tests.py```, and can be run using ```python backend_tests.py```. The tests for automation are in ```./automation/automate_tests.py```, and can be run using ```python automate_tests.py```.

### Backend is fully functional with all requirements, for conversion of single currency with usd, conversion between any two currencies, option to select date range and conversion of multiple currencies with usd or any other currency. And ability to get daily, weekly, monthly and yearly data of any currency with any other currency.
api is also hosted at : Replit [https://mit-team10-xchange.jxt1n.repl.co/]


<br>

### 2. Run the flask app

```
cd backend
python backend.py
```

### 3. Run the React app

```
npm start
```


## Progress on frontend 
- Static UI working, with dropdowns for currency selection, date range selection and radio buttons for selecting the type of data to be displayed.
- API calls to backend are under progress, with backend being fully functional.