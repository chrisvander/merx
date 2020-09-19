import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead, TypeaheadInputSingle } from 'react-bootstrap-typeahead';

const colors = ["red", "purple", "green", "gray", "orange"]
const tickerWhitelist = ["AAPL", "GOOG", "MSFT"]

export const Graph  = (props) => {
    const [tickers, setTickers] = useState([]);
    const [counter, setCounter] = useState(0);
    const [tickerInput, setTickerInput] = useState("");

    const addTicker = tickersSelected => {
        tickersSelected.forEach(ticker => {
            if (tickerWhitelist.includes(ticker)) {
                setTickers([...tickers, {
                    key: counter,
                    color: colors[counter % colors.length],
                    ticker
                }]);
    
                setCounter(counter + 1);
            }
        })
    }

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
                options={tickerWhitelist}
                placeholder="Ticker"
                id="ticker-selector"
                className="mb-2"
                emptyLabel="No tickers found."
            />
            {tickers.map(createButton)}
            <Button onClick={() => addTicker(tickerInput)}>
                Add ticker
            </Button>
        </div>
    );
}
