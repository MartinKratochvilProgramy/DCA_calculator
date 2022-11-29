import express from 'express';
const cors = require('cors');
require('dotenv').config()
const app = express();
const getData = require("./getHistoricalData");
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

  const data: TickerDataInterface[] = [];

  for (let i = 0; i < tickers.length; i++) {
    const tickerData: TickerDataInterface = await getData(tickers[i], startDate);
    data.push(tickerData);
  }

  res.json(data)
})

app.post("/stock_add", async (req: any, res: any) => {
  const ticker: string = req.body.ticker;

  const stockInfo = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`)
  const stockInfoJson = await stockInfo.json()

  res.json(stockInfoJson.chart.error);
  
})



app.listen(PORT, () => {
  console.log(`Connected @ ${PORT}`);
});

