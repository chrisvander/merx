import PortfolioAnalytics from 'portfolio-analytics';
import math from 'mathjs';
import moment from 'moment';

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

export {
    get_return, get_sd, get_yr_return, get_yr_sd, sharpe
}