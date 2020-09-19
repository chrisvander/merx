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
import quandl

app = Flask(__name__)
CORS(app)
quandl.ApiConfig.api_key = 'uyxvXKZ3zKytArHDVdwR'

@app.route('/stock-history/', methods=['GET'])
def get_history():
  return request_stock(request.args)

@app.route('/stock-tickers/', methods=['GET'])
def get_tickers():
  return jsonify({'HD': 'Home Depot','DIS': 'Disney','MSFT': 'Microsoft','BA': 'Boeing','MMM': '3M','PFE': 'Pfizer','NKE': 'Nike','JNJ': 'Johnson & Johnson','MCD': 'McDonalds','INTC': 'Intel','XOM': 'Exxon Mobil','GS': 'Goldman Sachs','JPM': 'JP Morgan','AXP': 'American Express','V': 'Visa','IBM': 'IBM','UNH': 'United Health','PG': 'Proctor & Gamble','GE': 'General Electric','KO': 'Coca-Cola','CSCO': 'Cisco Systems','CVX': 'Chevron','CAT': 'Caterpillar','MRK': 'Merck','WMT': 'Walmart','VZ': 'Verizon','UTX': 'Raytheon','TRV': 'Travelers' ,'AAPL': 'Apple'})

@app.route('/bonds/', methods=['GET'])
def get_bonds():
  df = quandl.get_table('CHORD7/BD', date='2013-05-01', qopts={'columns':['date', 'ask_price']})
  print(df.index)
  
  return df.to_json()

@app.route('/returns/', methods=['GET'])
def get_return():
  input = request.args
  start_price = str(quandl.get("EOD/" + input['stock'], start_date=input['start'], end_date=input['start'])['Close'][0])
  end_price = str(quandl.get("EOD/" + input['stock'], start_date=input['end'], end_date=input['end'])['Close'][0])
  return 

def request_stock(input):
  if 'stock' in input:
    stock = input['stock']
  else:
    return 'error: must provide stock ticker'

  df = quandl.get("EOD/" + stock)

  if 'start' in input:
    start = input['start']
  else:
    start = str(df.index[0])[:10]

  if 'end' in input:
    end = input['end']
  else:
    end = str(df.index[-1])[:10]

  return quandl.get("EOD/" + stock, start_date=start, end_date=end)["Close"].to_json()

if __name__ == "__main__":
  app.run(debug=False, port=5000)