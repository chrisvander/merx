'''
request info about a certain stock
URL Format: <url>/?mode=stock&stock=<stock>&beg=<start time>&<end time>&int=<interval>

http://localhost:5000/stock/?stock=APPL&start=2013-04-23&end=2013-04-24
'''

from flask import Flask, request, jsonify
import quandl

app = Flask(__name__)
quandl.ApiConfig.api_key = 'uyxvXKZ3zKytArHDVdwR'

@app.route('/stock-history/', methods=['GET'])
def get_history():
  return request_stock(request.args)

@app.route('/stock-tickers/', methods=['GET'])
def get_tickers():
  return jsonify(['HD','DIS','MSFT','BA','MMM','PFE','NKE','JNJ','MCD','INTC','XOM','GS','JPM','AXP','V','IBM','UNH','PG','GE','KO','CSCO','CVX','CAT','MRK','WMT','VZ','UTX','TRV','AAPL'])

@app.route('/bonds/', methods=['GET'])
def get_bonds():
  df = quandl.get_table('CHORD7/BD', date='2013-05-01', qopts={'columns':['date', 'ask_price']})
  print(df.index)
  
  return df.to_json()

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

  json = quandl.get("EOD/" + stock, start_date=start, end_date=end)["Close"].to_json()


  return json

if __name__ == "__main__":
  app.run(debug=False, port=5000)