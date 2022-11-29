const yahooFinance = require('yahoo-finance');

interface TickerDataInterface {
    ticker: string;
    dates: string[];
    values: number[];
}

async function getHistoricalData(ticker: string, startDate: string): Promise<TickerDataInterface> {
  
    const tickerData: TickerDataInterface = await new Promise((res, rej) => {
      yahooFinance.historical({
        symbol: ticker,
        from: startDate,
        to:  new Date(),
      }, function (err: any, quotes: any) {
        if (err) rej(err);
  
        const dates: string[] = [];
        const values: number[] = [];
  
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