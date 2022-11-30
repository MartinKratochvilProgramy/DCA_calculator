import React, { useState, useEffect } from 'react';
import { TickersSelect } from './components/TickersSelect';
import { TickersDisplay } from './components/TickersDisplay';
import { serverRoute } from './serverRoute';
import dayjs, { Dayjs } from 'dayjs';

interface TickerDataInterface {
  ticker: string;
  dates: string[];
  values: number[];
}

function App() {

  const [tickers, setTickers] = useState<string[]>([]);
  const [data, setData] = useState<TickerDataInterface[]>([]);
  const [startDate, setStartDate] = useState<Dayjs>( dayjs('2014-08-18'));
  const [startAmount, setStartAmount] = useState<number | null>(null);
  const [incrementAmount, setIncrementAmount] = useState<number | null>(null);

  const [inputComplete, setInputComplete] = useState<boolean>(false);

  useEffect(() => {
    if (startAmount !== null && incrementAmount !== null && tickers.length > 0) {
      setInputComplete(true);
    }
  }, [startAmount, incrementAmount, tickers])
  

  function getData(): void {
    console.log("get data");

    fetch(serverRoute + '/get_chart_data', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tickers: tickers,
        startDate: startDate,
        startAmount: startAmount,
        incrementAmount: incrementAmount 
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

  function addTicker(newTicker: string): void {
    if (!tickers.includes(newTicker)) {
      setTickers([...tickers, newTicker]);
    }
  }

  function deleteTicker(tickerName: string): void {
    console.log(tickerName);
    
    const newTickers = tickers;
    newTickers.splice(newTickers.indexOf(tickerName), 1);
    console.log(newTickers);
    
    setTickers([...newTickers]);
  }

  function modifyStartDate(startDate: Dayjs): void {
    setStartDate(startDate);
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <TickersSelect 
        tickers={tickers}
        addTicker={addTicker}  
        deleteTicker={deleteTicker}  
        modifyStartDate={modifyStartDate}
        setStartAmount={setStartAmount}
        setIncrementAmount={setIncrementAmount}
      />
      <TickersDisplay
        data={data}
        inputComplete={inputComplete}
        getData={getData}
      />
    </div>
  )
}

export default App
