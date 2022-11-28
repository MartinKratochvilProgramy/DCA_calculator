import React, { useState } from 'react';
import { TickersSelect } from './components/TickersSelect';
import { TickersDisplay } from './components/TickersDisplay';
import { serverRoute } from './serverRoute';

interface TickerDataInterface {
  ticker: string;
  dates: string[];
  values: number[];
}

function App() {

  const [tickers, setTickers] = useState<string[]>(["AAPL", "MSFT"]);
  const [data, setData] = useState<TickerDataInterface[]>([]);

  function getData(): void {
    console.log("get data");

    fetch(serverRoute + '/get_chart_data', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tickers: tickers,
        startDate: "2022-11-11" 
      })
    })
    .then((response ) => response.json())
    .then((res) => {
      console.log(res)
      setData(res)
    })
    .catch((error) => {
      console.log(error.message)
    })
    
  }

  return (
    <div className="">
      <TickersSelect 
        tickers={tickers}
        setTickers={setTickers}  
        getData={getData}
      />
      <TickersDisplay
        data={data}
      />
    </div>
  )
}

export default App
