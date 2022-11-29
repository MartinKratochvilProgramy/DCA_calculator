import React, { FC, useState } from 'react';
import { Ticker } from './Ticker';
import { AddTickerForm } from './AddTickerForm';
import Chip from '@mui/material/Chip';

interface Props {
    tickers: string[];
    addTicker: (tickers: string) => void;
    deleteTicker: (tickers: string) => void;
    getData: () => void;
}

export const TickersSelect: FC<Props> = ({ tickers, addTicker, deleteTicker, getData }) => {


  return (
      <div className="md:px-12 px-2 pt-14 md:pt-1 lg:w-6/12 md:w-8/12 w-10/12 m-auto">

      <AddTickerForm 
        addTicker={addTicker}
      />

      <div className="flex justify-center">
        {tickers.map(ticker => {
          return (
            <Chip 
              key={ticker}
              label={ticker} 
              color="primary" 
              variant="outlined" 
              onDelete={() => deleteTicker(ticker)}  
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
