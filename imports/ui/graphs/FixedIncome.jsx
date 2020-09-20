import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead, TypeaheadInputSingle } from 'react-bootstrap-typeahead';
import Plot from 'react-plotly.js';


export const FixedIncome  = () => {
    return (
        <Plot
            data={[
                {
                    y: [-1000, 50, 50, 50, 50, 50, 50, 50, 1050],
                    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    marker: {
                        color: ["darkred", "darkgreen", "darkgreen", "darkgreen", "darkgreen", "darkgreen", "darkgreen", "darkgreen", "darkgreen"], 
                    },
                    type: "bar"
                }
            ]}
            
            layout={{
                title: "$1,000 bond with 5% stated rate and 8 year maturity",
                xaxis: {
                    title: "Year"
                },
                yaxis: {
                    title: "Cashflow"
                }
            }}
        />
    );
}
