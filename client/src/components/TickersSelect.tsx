import React, { FC, useState } from 'react';
import { AddTickerForm } from './AddTickerForm';
import Chip from '@mui/material/Chip';
import { SelectRangesForm } from '../components/SelectRangesForm';
import { Dayjs } from 'dayjs';

interface Props {
    tickers: string[];
    waitingForData: boolean;
    inputComplete: boolean;
    addTicker: (tickers: string) => void;
    deleteTicker: (tickers: string) => void;
    modifyStartDate: (startDate: Dayjs) => void;
    setStartAmount: (startAmount: number) => void;
    setIncrementAmount: (incrementAmount: number) => void;
    getData: () => void;
}

export const TickersSelect: FC<Props> = ({ tickers, waitingForData, inputComplete, addTicker, deleteTicker, modifyStartDate, setStartAmount, setIncrementAmount, getData }) => {


  return (
      <div className="md:px-12 px-2 pt-14 md:pt-1 lg:w-6/12 md:w-8/12 w-10/12 mb-0">

        <AddTickerForm 
          addTicker={addTicker}
        />

        <div className="flex justify-center flex-wrap my-2">
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


        <SelectRangesForm
          waitingForData={waitingForData}
          inputComplete={inputComplete}
          modifyStartDate={modifyStartDate}
          setStartAmount={setStartAmount}
          setIncrementAmount={setIncrementAmount}
          getData={getData}
        />
    </div>
  )
}
