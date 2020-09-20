import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead, TypeaheadInputSingle } from 'react-bootstrap-typeahead';
import Plot from 'react-plotly.js';


export const RiskGraph = () => {
    return (
        <Plot
            data={[
                {
                    x: [1, 2, 3, 4, 5],
                    y: [0.5, 2, 3.5, 5, 6.5],
                    text: ["Cash", "Bonds", "Real estate", "Commodities", "Stocks"],
                    textposition: "top",
                    type: "scatter",
                    mode: "lines+markers+text",
                }
            ]}

            layout={{
                title: "Expected risk versus return",
                xaxis: {
                    title: "Expected risk",
                    range: [0, 6],
                    showgrid: false,
                    showticklabels: false,
                },
                yaxis: {
                    title: "Potential return",
                    range: [0, 8],
                    showgrid: false,
                    showticklabels: false
                }
            }}
        />
    )
}