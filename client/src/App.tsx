import { useState, useEffect } from 'react';
import { TickersSelect } from './components/TickersSelect';
import { TickersDisplay } from './components/TickersDisplay';
import { serverRoute } from './serverRoute';
import { Dayjs } from 'dayjs';

interface TickerDataInterface {
  ticker: string;
  dates: string[];
  values: number[];
}

function App() {

  const [tickers, setTickers] = useState<string[]>(JSON.parse(localStorage.getItem("tickers") || "[]"));
  const [data, setData] = useState<TickerDataInterface[]>([]);
  const [waitingForData, setWaitingForData] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [startAmount, setStartAmount] = useState<number | null>(null);
  const [incrementAmount, setIncrementAmount] = useState<number | null>(null);

  const [inputComplete, setInputComplete] = useState<boolean>(false);

  useEffect(() => {
    if (startAmount !== null && incrementAmount !== null && tickers.length > 0 && startDate !== null) {
      setInputComplete(true);
    }
  }, [startAmount, incrementAmount, tickers, startDate])


  function getData(): void {
    console.log("get data");
    setWaitingForData(true);

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
      setData(res);
      setWaitingForData(false);
    })
    .catch((error) => {
      console.log(error.message)
    })
    
  }

  function addTicker(newTicker: string): void {
    if (!tickers.includes(newTicker)) {
      setTickers([...tickers, newTicker]);
      localStorage.setItem("tickers", JSON.stringify([...tickers, newTicker]));
    }
  }
  
  function deleteTicker(tickerName: string): void {
    console.log(tickerName);
    
    const newTickers = tickers;
    newTickers.splice(newTickers.indexOf(tickerName), 1);

    localStorage.setItem("tickers", JSON.stringify(newTickers));
    
    setTickers([...newTickers]);
  }

  function modifyStartDate(startDate: Dayjs): void {
    setStartDate(startDate);
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <TickersSelect 
        tickers={tickers}
        waitingForData={waitingForData}
        inputComplete={inputComplete}
        addTicker={addTicker}  
        deleteTicker={deleteTicker}  
        modifyStartDate={modifyStartDate}
        setStartAmount={setStartAmount}
        setIncrementAmount={setIncrementAmount}
        getData={getData}
      />
      <TickersDisplay
        data={data}
        getData={getData}
      />
    </div>
  )
}

export default App
