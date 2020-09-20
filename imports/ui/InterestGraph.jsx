import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead, TypeaheadInputSingle } from 'react-bootstrap-typeahead';
import Plot from 'react-plotly.js';

export const SimpleVsCompoundGraph = ({ init, percent, num_periods, payment }) => {
    x_axis = []
    for (let i = 0; i <= num_periods; i++) x_axis.push(i)

    return (
        <Plot
            data={[
                {
                    y: generate_simple(init, percent, x_axis, payment),
                    x: x_axis,
                    name: "Simple",
                    type: "line",
                    marker: {
                        color: "#242582",
                    }
                },
                {
                    y: generate_compound(init, percent, x_axis, payment),
                    x: x_axis,
                    name: "Compound",
                    type: "line",
                    marker: {
                        color: "#F64C72",
                    }
                }
            ]}
            
            layout={{
                title: "Simple versus Compound Interest",
                xaxis: {
                    title: "Year"
                },
                yaxis: {
                    title: "$$$"
                }
            }}
        />
    );
}

export const CompoundGraph = ({ init, percent, num_periods, payment }) => {
    x_axis = []
    for (let i = 0; i <= num_periods; i++) x_axis.push(i)

    return (
        <Plot
            data={[
                {
                    y: generate_compound(init, percent, x_axis, payment),
                    x: x_axis,
                    name: "Compound",
                    type: "line",
                    marker: {
                        color: "#F64C72",
                    }
                }
            ]}
            
            layout={{
                title: "Saving for Retirement",
                xaxis: {
                    title: "Year"
                },
                yaxis: {
                    title: "$$$"
                }
            }}
        />
    );
}

export const CompoundGraphx2 = ({ init, percent, num_periods, payment, offset }) => {
    x_axis = []
    for (let i = 0; i <= num_periods; i++) x_axis.push(i)

    return (
        <Plot
            data={[
                {
                    y: generate_compound(init, percent, x_axis, payment),
                    x: x_axis,
                    name: "Compound",
                    type: "line",
                    marker: {
                        color: "#F64C72",
                    }
                },
                {
                    y: generate_compound_offset(init, percent, x_axis, payment, offset),
                    x: x_axis,
                    name: "Compound with Offset",
                    type: "line",
                    marker: {
                        color: "#F64C72",
                    }
                },
            ]}
            
            layout={{
                title: "Saving for Retirement",
                xaxis: {
                    title: "Year"
                },
                yaxis: {
                    title: "$$$"
                }
            }}
        />
    );
}

const generate_simple = (init, percent, x_axis, payment) => {
    ret = [init]
    base = init
    growth_rate = percent/100
    for (let i = 1; i < x_axis.length; i++) {
        base += payment
        ret.push((base * growth_rate) + ret[i-1])
    }
    return ret
}

const generate_compound = (init, percent, x_axis, payment) => {
    ret = [init]
    growth_rate = percent/100
    for (let i = 1; i < x_axis.length; i++) {
        ret.push((ret[i-1] + payment) * (1 + growth_rate))
    }
    return ret
}

const generate_compound_offset = (init, percent, x_axis, payment, offset) => {
    ret = [init]
    growth_rate = percent/100
    for (let i = 1; i < x_axis.length; i++) {
        if (i < offset) {
            ret.push(init)
        } else {
            ret.push((ret[i-1] + payment) * (1 + growth_rate))
        }
    }
    return ret
}