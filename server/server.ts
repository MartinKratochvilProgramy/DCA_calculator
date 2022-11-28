const express = require("express");
const cors = require('cors');
require('dotenv').config()
const app = express();
const getData = require("./getHistoricalData");

app.use(cors()); // allow localhost 3000 (client) requests
app.use(express.json());

const PORT = process.env.PORT || 4000;

interface Data {
  ticker: String;
  dates: String[];
  values: Number[];
}

app.get("/get_chart_data", async (req: any, res: any) => {
  const tickers: String[] = req.body.tickers;
  const startDate: String = req.body.startDate;
  const data: Data[] = [];

  for (let i = 0; i < tickers.length; i++) {
    const tickerData: Data = await getData(tickers[i], startDate);
    data.push(tickerData);
  }
  
  res.json(data)
})



app.listen(PORT, () => {
  console.log(`Connected @ ${PORT}`);
});

