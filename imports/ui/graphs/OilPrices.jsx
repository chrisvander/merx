import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead, TypeaheadInputSingle } from 'react-bootstrap-typeahead';
import Plot from 'react-plotly.js';


export const OilPrices = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/wti_prices")
            .then(res => res.json())
            .then(res => {
                setPrices(res);
            });
    }, []);

    return (
        <>
        {prices.Date ?
            <Plot
                data={[
                    {
                        x: Object.values(prices.Date),
                        y: Object.values(prices["WTI futures"]),
                        type: "scatter",
                        mode: "lines",
                    }
                ]}

                layout={{
                    title: "Oil prices",
                    yaxis: {
                        title: "WTI (oil) prices",
                    }
                }}
            /> : null }
        </>
    )
}