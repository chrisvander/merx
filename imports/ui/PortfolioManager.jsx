import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { Typeahead, TypeaheadInputSingle } from 'react-bootstrap-typeahead';
import Plot from 'react-plotly.js';
import { get_return, get_sd, get_yr_return, get_yr_sd, sharpe } from '../api/returns';

const colors = ["red", "purple", "green", "gray", "orange"]
const tickerWhitelist = ["HD","DIS","MSFT","BA","MMM","PFE","JNJ","MCD","INTC","XOM","GS","JPM","AXP","V","IBM","UNH","PG","GE","KO","CSCO","CVX","CAT","MRK","WMT","VZ","UTX","TRV"]

export const PortfolioManager  = (props) => {
    const [tickers, setTickers] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [counter, setCounter] = useState(0);
    const [tickerInput, setTickerInput] = useState("");
    const [isLoading, setLoading] = useState(false);

    const typeahead = useRef(null);

    const addTicker = tickersSelected => {
        typeahead.current.clear()
        tickersSelected.forEach(ticker => {
            if (tickerWhitelist.includes(ticker)) {
                setLoading(true);
                fetch("http://localhost:5000/stock-history?stock=" + ticker)
                    .then(res => res.json())
                    .then(res => {
                        setTickers([...tickers, {
                            key: counter,
                            color: colors[counter % colors.length],
                            ticker,
                            prices: res,
                            proportion: Object.values(res)[0]
                        }]);
                        setLoading(false);
                    });
                setCounter(counter + 1);
            }
        })
    }

    useEffect(() => setPortfolio(getTotalValue(tickers)), [ tickers ])

    const removeTicker = key => {
        setTickers(tickers.filter(stock => stock.key != key))
    }

    const changeProportion = (event, key) => {
        if (event.target.value == "") return
        setTickers(
            tickers.map(stock => ({
                key: stock.key,
                color: stock.color,
                ticker: stock.ticker,
                prices: stock.prices,
                proportion: stock.key == key ? event.target.value : stock.proportion
            }))
        )
        setPortfolio(getTotalValue(tickers))
    }


    const createRow = ({ key, ticker, color, proportion }) => {
        return (
            <div className="row" style={{ paddingBottom: "10px" }} key={key}>
                <div className="col-9" style={{ color }}>${proportion} in {ticker}</div>
                <div className="col-3">
                    <Form.Control placeholder={"$ in " + ticker} onBlur={event => changeProportion(event, key)} />
                </div>
            </div>
        )
    }

    const getTotalValue = stocks => {
        if (stocks.length < 1) return 0

        const first_prop = stocks[0].proportion
        const first_price = Object.values(stocks[0].prices)[0]

        var dates = Object.keys(stocks[0].prices)
        var value = Object.values(stocks[0].prices).map(v => v * first_prop / first_price)

        stocks.slice(1, stocks.length).forEach(stock => {
            vs = Object.values(stock.prices)
            value = value.map((v, i) => v + stock.proportion * vs[i] / vs[0])
        })

        return [value, dates]
    }

    return (
        <div className="container">
            {portfolio[0] ?
            <div>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td>Annualized return</td>
                            <td>{
                                Math.round(100 * get_yr_return(portfolio[0], portfolio[1][0], portfolio[1][portfolio[1].length - 1])) / 100
                            }</td>
                        </tr>
                        <tr>
                            <td>Annualized standard deviation</td>
                            <td>{
                                Math.round(100 * get_yr_sd(portfolio[0], portfolio[1][0], portfolio[1][portfolio[1].length - 1])) / 100
                            }</td>
                        </tr>
                        <tr>
                            <td>Sharpe ratio</td>
                            <td>{
                                Math.round(100 * sharpe(portfolio[0], portfolio[1][0], portfolio[1][portfolio[1].length - 1])) / 100
                            }</td>
                        </tr>
                    </tbody>
                </Table>
            </div> : ""}


            <div className="row">
                <Typeahead
                    onChange={selected => setTickerInput(selected)}
                    options={tickerWhitelist}
                    placeholder="Ticker"
                    id="ticker-selector"
                    className="mb-2"
                    emptyLabel="No tickers found."
                    autocomplete="off" 
                    autocorrect="off" 
                    autocapitalize="off"
                    ref={typeahead}
                    className="col-10"
                />
                <Button className="col-2" disabled={isLoading} onClick={isLoading ? null : () => addTicker(tickerInput)}>
                    {isLoading ? 'Loading' : 'Add ticker' }
                </Button>
            </div>

            <br />

            
            {tickers.map(createRow)}

            {portfolio[0] ?
            <Plot
                data={[
                    {
                        y: portfolio[0],
                        x: portfolio[1].map(d => new Date(parseInt(d)).toISOString()),
                        marker: {
                            color: "gray"
                        },
                        name: "Total portfolio"
                    },
                    ...tickers.map(stock => ({
                        x: Object.keys(stock.prices).map(d => (new Date(parseInt(d))).toISOString()),
                        y: Object.values(stock.prices),
                        type: "scatter",
                        mode: "lines",
                        line: { color: stock.color },
                        name: stock.ticker
                    }))
                ]}

                layout={{
                    title: "Total portfolio value over time",
                    xaxis: {
                        title: "Date",
                        rangeslider: {}
                    },
                    yaxis: {
                        title: "Value"
                    }
                }}
            />

            : <br />}

            <Plot
                data={[{
                    z: [[1, 0.8, 0.6], [0.6, 1, 0.8], [0.8, 0.6, 1]],
                    x: ["AAPL", "MSFT", "GOOG"],
                    y: ["AAPL", "MSFT", "GOOG"],
                    type: "heatmap",
                    colorscale: [[0, "darkred"], [0.5, "white"], [1, "darkgreen"]],
                    zmin: -1,
                    zmax: 1
                }]}
            />
        </div>
    );
}
