const yahooFinance = require('yahoo-finance');

interface TickerDataInterface {
    ticker: String;
    dates: String[];
    values: Number[];
}

async function getHistoricalData(ticker: String, startDate: String): Promise<TickerDataInterface> {
  
    const tickerData: TickerDataInterface = await new Promise((res, rej) => {
      yahooFinance.historical({
        symbol: ticker,
        from: startDate,
        to:  new Date(),
      }, function (err: any, quotes: any) {
        if (err) rej(err);
  
        const dates: String[] = [];
        const values: Number[] = [];
  
        for (let i = 0; i < quotes.length; i++) {
          dates.push(quotes[i].date);
          values.push(quotes[i].open)
        }
        res({ticker, dates, values})
      });
    })
    return tickerData;
  }

module.exports = getHistoricalData;
