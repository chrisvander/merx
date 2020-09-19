import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead, TypeaheadInputSingle } from 'react-bootstrap-typeahead';



const RiskGraph = () => {
    return (
        <Plot
            data={[{
                x: [1, 2, 3],
                y: [5, 12, 18],
                type: "scatter",
                mode: "lines+markets",
                name: stock.ticker
            }]}

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
    )
}