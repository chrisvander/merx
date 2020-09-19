import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


export const Graph  = (props) => {
    const [tickers, setTickers] = useState([]);

    const addTicker = ticker => {
        console.log("Adding " + ticker)
        setTickers([...tickers, ticker])
    }

    return (
        <div>
            <Button onClick={() => addTicker("AAPL")}>
                Add ticker
            </Button>
        </div>
    );
}
