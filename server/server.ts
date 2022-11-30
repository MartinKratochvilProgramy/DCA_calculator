import express from 'express';
const cors = require('cors');
require('dotenv').config()
const app = express();
const getHistoricalData = require("./getHistoricalData");
const fetch = require('node-fetch');

app.use(cors()); // allow localhost 3000 (client) requests
app.use(express.json());

const PORT = process.env.PORT || 4000;

interface TickerDataInterface {
  ticker: string;
  dates: string[];
  values: number[];
}

app.post("/get_chart_data", async (req: any, res: any) => {
  const tickers: string[] = req.body.tickers;
  const startDate: string = req.body.startDate;
  const startAmount: number = req.body.startAmount;
  const incrementAmount: number = req.body.incrementAmount;

  const data: TickerDataInterface[] = [];

  for (let i = 0; i < tickers.length; i++) {
    const tickerData: TickerDataInterface = await getHistoricalData(tickers[i], startDate);
    const relativeChange: number[] = getRelativeChange(tickerData.values);
    const DCAValues: number[] = getDCAValues(relativeChange, tickerData.dates, startAmount, incrementAmount);
    
    tickerData.values = DCAValues;

    data.push(tickerData);
  }

  res.json(data)
})

app.post("/validate_ticker", async (req: any, res: any) => {
  const ticker: string = req.body.ticker;
  console.log(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`);

  const stockInfo = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`)
  const stockInfoJson = await stockInfo.json()

  res.json(stockInfoJson.chart.error);
  
})

app.listen(PORT, () => {
  console.log(`Connected @ ${PORT}`);
});

function getRelativeChange(data: number[]): number[] {
  const output: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      output.push(1)
    } else {
      output.push(data[i] / data[i - 1])
    }
  }

  return output;
}

function getDCAValues(relativeChange: number[], dates: string[], startAmount: number, incrementAmount: number): number[] {
  const DCAValues: number[] = [startAmount];
  let currentMonth: number = new Date(dates[0]).getMonth();

  for (let i = 0; i < relativeChange.length; i++) {
    
    if (i > 0) {
      const month = new Date(dates[i]).getMonth();
      
      if (month > currentMonth || (month === 0 && currentMonth === 11)) {
        DCAValues[DCAValues.length - 1] += incrementAmount;
        currentMonth = month;
      }
      DCAValues.push(relativeChange[i] * DCAValues[DCAValues.length - 1]);
    }
  }
  
  return DCAValues;
}