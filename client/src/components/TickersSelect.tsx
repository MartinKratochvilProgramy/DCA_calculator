import React, { FC, useState } from 'react';
import { Ticker } from './Ticker';
import { AddTickerForm } from './AddTickerForm';

interface Props {
    tickers: string[];
    setTickers: (tickers: string[]) => void;
    getData: () => void;
}

export const TickersSelect: FC<Props> = ({ tickers, setTickers, getData }) => {


  return (
      <div className="md:px-12 px-2 pt-14 md:pt-1 lg:w-6/12 md:w-8/12 w-10/12 m-auto">

      <AddTickerForm 
        setTickers={setTickers}
        tickers={tickers}
      />

      <div className="flex justify-center">
        {tickers.map(ticker => {
          return (
            <Ticker 
              ticker={ticker} 
              setTickers={setTickers} 
              key={ticker}  
            />  
          )
        })}
      </div>

      Ticker Select
      <br />
      <button onClick={getData}>
          Get data!
      </button>
  </div>
  )
}
