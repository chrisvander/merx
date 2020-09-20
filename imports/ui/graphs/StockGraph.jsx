import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead, TypeaheadInputSingle } from 'react-bootstrap-typeahead';
import Plot from 'react-plotly.js';


const colors = ["red", "purple", "green", "gray", "orange"]
const tickerWhitelist = ["HD","DIS","MSFT","BA","MMM","PFE","JNJ","MCD","INTC","XOM","GS","JPM","AXP","IBM","UNH","PG","GE","KO","CSCO","CVX","CAT","MRK","WMT","VZ","UTX","TRV"]

export const StockGraph  = (props) => {
    const [tickers, setTickers] = useState([]);
    const [counter, setCounter] = useState(0);
    const [allPrices, setAllPrices] = useState([]);
    const [tickerInput, setTickerInput] = useState("");
    const [isLoading, setLoading] = useState(false);

    const typeahead = useRef(null);

    const addTicker = tickersSelected => {
        typeahead.current.clear()
        tickersSelected.forEach(ticker => {
            if (tickerWhitelist.includes(ticker)) {
                setLoading(true);
                setTickers([...tickers, {
                    key: counter,
                    color: colors[counter % colors.length],
                    ticker,
                    prices: allPrices[ticker],
                    proportion: Object.values(allPrices[ticker])[0]
                }])
                setLoading(false);
                setCounter(counter + 1);
            }
        })
    }

    const fetchAllPrices = () => {
        setLoading(true);
        fetch("http://localhost:5000/all-prices/")
            .then(res => res.json())
            .then(res => {
                setAllPrices(res);
                setLoading(false);
            })
        
    }

    useEffect(() => fetchAllPrices(), [])

    const removeTicker = key => {
        setTickers(tickers.filter(stock => stock.key != key))
    }

    const createButton = ({ key, ticker, color }) => {
        return (
            <React.Fragment key={key}>
                <Button
                    variant="outline-danger"
                    className="hover-white button"
                    style={{ color, borderColor: color }}
                    onClick={() => removeTicker(key)}
                >
                    {ticker}
                </Button>
                {" "}
            </React.Fragment>
        )
    }

    return (
        <div>
            <Typeahead
                onChange={selected => setTickerInput(selected)}
                options={tickerWhitelist.filter(ticker => !tickers.map(s => s.ticker).includes(ticker))}
                placeholder="Ticker"
                id="ticker-selector"
                className="mb-2"
                emptyLabel="No tickers found."
                autocomplete="off" 
                autocorrect="off" 
                autocapitalize="off"
                ref={typeahead}
            />
            {tickers.map(createButton)}
            <Button disabled={isLoading} onClick={isLoading ? null : () => addTicker(tickerInput)}>
                {isLoading ? 'Loading' : 'Add ticker' }
            </Button>

            <br />

            {tickers.length > 0 ?
            <Plot
                data={tickers.map(stock => ({
                    x: Object.keys(stock.prices).map(d => (new Date(parseInt(d))).toISOString()),
                    y: Object.values(stock.prices),
                    type: "scatter",
                    mode: "lines",
                    line: { color: stock.color },
                    name: stock.ticker
                }))}

                layout={{
                    xaxis: {
                        title: "Date",
                        rangeslider: {}
                    },
                    yaxis: {
                        title: "Price"
                    }
                }}
            />

            : <br />}
        </div>
    );
}
