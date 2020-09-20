import PortfolioAnalytics from 'portfolio-analytics';
import math from 'mathjs';
import moment from 'moment';
import Correlation from 'node-correlation';

const calc_pct_returns = value => {
    return value.slice(1, value.length).map((v1, i) => 100 * (v1 / value.slice(0, value.length - 1)[i] - 1))
}

const get_return = value => {
    return Math.round(100 * 100 * PortfolioAnalytics.cumulativeReturn(value)) / 100
}

const get_yrs_elapsed = (begDate, endDate) => {
    return moment(new Date(parseInt(endDate))).diff(moment(new Date(parseInt(begDate))), "years", true)
}

const get_yr_return = (value, begDate, endDate) => {
    return 100 * ((1 + get_return(value) / 100) ** (1 / get_yrs_elapsed(begDate, endDate)) - 1)
}

const get_yr_sd = (value, begDate, endDate) => {
    return get_sd(value) * Math.sqrt(value.length / get_yrs_elapsed(begDate, endDate))
}

const get_sd = value => {
    return math.std(calc_pct_returns(value))
}

const sharpe = (value, begDate, endDate) => {
    return (get_yr_return(value, begDate, endDate) - 1.5) / get_yr_sd(value, begDate, endDate)
}

const calc_corrs = (stocks) => {
    const names = stocks.map(stock => stock.ticker);
    var corr_matrix = []

    stocks.forEach(stock_left => {
        returns_left = calc_pct_returns(Object.values(stock_left.prices))
        var row = []
        stocks.forEach(stock_right => {
            returns_right = calc_pct_returns(Object.values(stock_right.prices))

            corr = Correlation.calc(returns_left.slice(returns_left.length - 60, returns_left.length), returns_right.slice(returns_right.length - 60, returns_right.length))
            row.push(corr)
        })

        corr_matrix.push(row)
    })

    return corr_matrix
}


const recommend_stocks = (value, allPrices, usedTickers) => {
    portfolio_returns = calc_pct_returns(value)

    corrs = Object.keys(allPrices).filter(t => !usedTickers.includes(t)).map(ticker => {
        prices = allPrices[ticker]

        stock_returns = calc_pct_returns(Object.values(prices))

        return [ticker, Math.abs(Correlation.calc(
            portfolio_returns.slice(portfolio_returns.length - 60, portfolio_returns.length),
            stock_returns.slice(stock_returns.length - 60, stock_returns.length)
        ))]
    })

    tickers = corrs.sort((a, b) => a[1] - b[1]).slice(0, 3).map(i => i[0])

    return "" + tickers[0] + ", " + tickers[1] + ", or " + tickers[2]
}


export {
    get_return, get_sd, get_yr_return, get_yr_sd, sharpe, calc_corrs, recommend_stocks
}