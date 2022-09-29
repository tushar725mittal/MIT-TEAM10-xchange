# Information for the backend

The backend utilises NoSQL database MongoDB, with data being fed in different collections for each currency, which contain the daily data being indexed using date of each record. The indexing implemented ensures that the speed of retrieval is high, and the collections ensure only relavent data is being retrieved.

<!-- Structure  -->

## Structure

51 Collections, each for each currency

Each collection contains the daily data for the currency, indexed by date

Example : 


INR Collection : *contains*
- ```{date : 2020-01-01, rate (With usd) : 70.00}```
- ```{date : 2020-01-02, rate (With usd) : 70.10}```
and so on

<!-- API  -->
The api provides multiple routes, which have the explanation in their function docstrings.
Uses can be seen in roughcheck.ipynb, while the backend_tests.py contains unittests for the backend.
