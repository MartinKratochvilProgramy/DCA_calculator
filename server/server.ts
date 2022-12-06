import express from 'express';
import { TickerDataInterface } from './types/TickerDataInterface';
import { getDCAValues, getHistoricalData, getRelativeChange } from './functions';

const cors = require('cors');
require('dotenv').config()
const fetch = require('node-fetch');

const app = express();
app.use(cors()); // allow localhost 3000 (client) requests
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/get_chart_data", async (req: any, res: any) => {
  // generates chart data for each ticker in req.body.tickers
  const tickers: string[] = req.body.tickers;
  const startDate: string = req.body.startDate;
  const startAmount: number = req.body.startAmount;
  const incrementAmount: number = req.body.incrementAmount;
  const investmentPeriod: string = req.body.investmentPeriod;

  const data: TickerDataInterface[] = []; // data array to be sent to client

  for (let i = 0; i < tickers.length; i++) {
    // generate values for each ticker
    const tickerData: TickerDataInterface = await getHistoricalData(tickers[i], startDate);
    const relativeChange: number[] = getRelativeChange(tickerData.values);
    
    tickerData.values = getDCAValues(relativeChange, tickerData.dates, startAmount, incrementAmount, investmentPeriod);
    data.push(tickerData);
  }

  // if nonzero increment, add DCA values with no growth for comparison in client
  if (incrementAmount > 0) {
    const nonInvestmentValues: TickerDataInterface = {
      ticker: "No investment",
      dates: data[0].dates,
      // relative change is 1 for given time-frame
      values: getDCAValues(new Array(data[0].dates.length).fill(1), data[0].dates, startAmount, incrementAmount, investmentPeriod)
    }
    data.push(nonInvestmentValues);
  }

  res.json(data)
})

app.post("/validate_ticker", async (req: any, res: any) => {
  // if ticker is valid, returns chart.error = null
  const ticker: string = req.body.ticker;

  const stockInfo = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`)
  const stockInfoJson = await stockInfo.json()

  res.json(stockInfoJson.chart.error);
  
})

app.listen(PORT, () => {
  console.log(`Connected @ ${PORT}`);
});

