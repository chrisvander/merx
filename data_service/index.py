'''
get stock tickers: 
  URL: 
    http://localhost:5000/stock-tickers/
  
  returns json list of ticker strings
    ["HD","DIS","MSFT","BA","MMM","PFE","NKE"...]

get stock prices: 
  URL: 
    http://localhost:5000/stock-history/?stock=<ticker>
    or 
    http://localhost:5000/stock-history/?stock=<ticker>&start=<YYYY-MM-DD>
    or
    http://localhost:5000/stock-history/?stock=<ticker>&end=<YYYY-MM-DD>
    or
    http://localhost:5000/stock-history/?stock=<ticker>&start=<YYYY-MM-DD>&end=<YYYY-MM-DD>

  returns json of <epoch time>:<stock price>
    {"1378166400000":488.58,"1378252800000":498.691,"1378339200000":495.27...}

get apple bond prices:
  URL:
    http://localhost:5000/bonds/
  returns json of <index>:<epoch time> and json of <index>:<price>
    {
      "date":
        {"0":1367366400000,"1":1367366400000,"2":1367366400000,"3":1367366400000...}
      "ask_price":
        {"0":100.5425,"1":100.602,"2":100.602,"3":100.725...}
    }
  
get return on investment
  URL:
    http://localhost:5000/returns/?stock=<ticker>&init=<$investment>&start=<YYYY-MM-DD>&end=<YYYY-MM-DD>
'''

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
import quandl

app = Flask(__name__)
CORS(app)
quandl.ApiConfig.api_key = 'uyxvXKZ3zKytArHDVdwR'

ticker_to_company = {'HD': 'Home Depot','DIS': 'Disney','MSFT': 'Microsoft','BA': 'Boeing','MMM': '3M','PFE': 'Pfizer','NKE': 'Nike','JNJ': 'Johnson & Johnson','MCD': 'McDonalds','INTC': 'Intel','XOM': 'Exxon Mobil','GS': 'Goldman Sachs','JPM': 'JP Morgan','AXP': 'American Express','V': 'Visa','IBM': 'IBM','UNH': 'United Health','PG': 'Proctor & Gamble','GE': 'General Electric','KO': 'Coca-Cola','CSCO': 'Cisco Systems','CVX': 'Chevron','CAT': 'Caterpillar','MRK': 'Merck','WMT': 'Walmart','VZ': 'Verizon','UTX': 'Raytheon','TRV': 'Travelers' ,'AAPL': 'Apple'}

all_prices = pd.DataFrame()

for ticker in ticker_to_company:
    close_prices = quandl.get("EOD/{}".format(ticker))["Close"]
    close_prices.name = ticker
    all_prices[ticker] = close_prices

print("Prices loaded")

@app.route('/stock-history/', methods=['GET'])
def get_history():
  return request_stock(request.args)

# Load the file once when the server gets started
wti_prices = pd.read_csv("data_service/wti_prices.csv")

@app.route('/wti_prices/', methods=['GET'])
def get_wti_prices():
  return wti_prices.to_json()

# Load the file once when the server gets started
etf_prices = pd.read_csv("data_service/etf_prices.csv")

@app.route('/etf_prices/', methods=['GET'])
def get_etf_prices():
  return etf_prices.to_json()

def request_stock(input):
  if 'stock' in input:
    stock = input['stock']
  else:
    return 'error: must provide stock ticker'

  return all_prices[[stock]].to_json()

@app.route("/all-prices/", methods=["GET"])
def get_all_prices():
  return all_prices.to_json()

if __name__ == "__main__":
  app.run(debug=False, port=5000)