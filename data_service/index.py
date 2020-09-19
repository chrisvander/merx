'''
request info about a certain stock
URL Format: <url>/?mode=stock&stock=<stock>&beg=<start time>&<end time>&int=<interval>

http://localhost:5000/stock/?stock=APPL&start=2013-04-23&end=2013-04-24
'''

from flask import Flask, request
import quandl

app = Flask(__name__)
quandl.ApiConfig.api_key = 'uyxvXKZ3zKytArHDVdwR'

@app.route('/', methods=['GET'])
def query():
  input = request.args

  if True: # option == 'stock':
    output = request_stock(input)
  else:
    output = 'error: invalid address'
  return output

def request_stock(input):
  if 'stock' in input:
    stock = input['stock']
  else:
    return 'error: must provide stock ticker'

  if 'start' in input:
    start = input['start']
  else:
    start = None

  if 'end' in input:
    end = input['end']
  else:
    end = None

  return quandl.get("EOD/" + stock, start_date=start, end_date=end).to_json()
''', start_date=start, end_date=end'''
# def parse_date(date):
#   return {'year': int(str(date)[:4]), 'month': int(str(date)[5:7]), 'day': int(str(date)[8:10])}

if __name__ == "__main__":
  app.run(debug=False, port=5000)