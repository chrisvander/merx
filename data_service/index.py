'''
request info about a certain stock
URL Format: <url>/?mode=stock&stock=<stock>&beg=<start time>&<end time>&int=<interval>
'''

from flask import Flask, request
import pandas as pd
import quandl
app = Flask(__name__)
quandl.ApiConfig.api_key = 'uyxvXKZ3zKytArHDVdwR'

@app.route('/', methods=['GET'])
def query():
  input = request.args
  return quandl.get("EOD/" + input['stock'], column_index='1', start_date=input['start'], end_date=input['end']).to_json()
  # input = {}
  # input['stock'] = 'DIS'
  # input['start_date'] = '2017-12-06'
  # input['end_date'] = '2017-12-28'

  # dataframe = quandl.get("EOD/" + input['stock'], start_date=input['start_date'])
  # dataframe = parse_dataframe(dataframe, input['end_date'])
  # return dataframe.to_json()[9:-1]
  # if mode == "stock":
  #   # get_stock_history(input)
  #   return "Stock but a json"
  # elif mode == "whatever":
  #   return "Requesting whatever..."
  # else:
  #   return "Invalid format: {} option is not supported".format(mode)

  # df_filtered = df[df['Date'][:3] >= end_date[:3]]
  # print(df_filtered)
  pass
  # return dataframe

def parse_date(date):
  return {'year': int(str(date)[:4]), 'month': int(str(date)[5:7]), 'day': int(str(date)[8:10])}

# def get_stock_history(input):
#   stock = input["stock"]
#   begin_time = input["beg"]
#   end_time = input["end"]
#   interval = input["int"]
#   # request info from goldman sachs
#   # parse data
#   # construct into json
#   output = None
#   return output

if __name__ == "__main__":
  app.run(debug=True, port=5000)