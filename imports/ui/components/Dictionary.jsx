import React from 'react';
import ReactTooltip from 'react-tooltip';

const definitions = {
    "sharpe ratio": "The Sharpe ratio measures the performance of an investment compared to a risk-free asset, after adjusting for its risk. ",
    "annualized standard deviation": "The Annualized Standard Deviation is the standard deviation multiplied by the square root of the number of periods in one year.",
    "invest": "expend money with the expectation of achieving a profit or material result by putting it into financial schemes, shares, or property, or by using it to develop a commercial venture.",
    "asset class": "a broad grouping of investments that are similar in nature",
    "annualized return": "The amount of money you get back in the form of a percentage on your initial investment",
    "risk tolerance": "the degree of variability in investment returns that an investor is willing to withstand in their financial planning",
    "volatile": "volatility is the degree of variation of a trading price series over time, usually measured by the standard deviation of logarithmic returns"
}

const Dictionary = ({ text }) => {
    return (
        <>
            <span data-tip data-for={text} className="hoverable-text">{text}</span>
            <ReactTooltip id={text} className="tooltip" multiline={true} width="50px" place="top" effect="solid">
                {definitions[text.toLowerCase()]}
            </ReactTooltip>
        </>
    );
}

export default Dictionary;