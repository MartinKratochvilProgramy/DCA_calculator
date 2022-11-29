import React, { useState, FC } from 'react';
import { serverRoute } from '../serverRoute';
import Button from '@mui/material/Button';

interface Props {
    addTicker: (ticker: string) => void;
}

interface Error {
    code: string;
    description: string;
}

export const AddTickerForm: FC<Props> = ({ addTicker }) => {

    const [error, setError] = useState<null | Error>(null);
    const [tickerInput, setTickerInput] = useState<string>("");

    function handleInputClick(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        
        if (tickerInput === "") return;
        
        setTickerInput("");

        // validate ticker input
        fetch(serverRoute + '/validate_ticker', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ticker: tickerInput.toUpperCase(), 
            })
          })
          .then((response) => response.json())
          .then((res: null | Error) => {
            setError(res);
            if (res === null) {
                addTicker(tickerInput.toUpperCase());
            }
          })
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        <form 
            onSubmit={(e) => handleInputClick(e)} 
            className="flex flex-col space-y-4 items-center">   
            <label htmlFor ="add-stock" className="sr-only">Add stock</label>
            <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0 text-black dark:text-white'>
                SELECT <span className='text-blue-600'>TICKERS</span> YOU WISH TO <span className='text-blue-600'>TRACK</span>
            </h1>
            <div className="relative flex flex-row justify-center h-full w-full">
                <div className='w-6/12'>
                    <label htmlFor ="add-stock" className="sr-only">Ticker input</label>
                    <input 
                    type="text" 
                    id="ticker-input" 
                    className="bg-gray-100 border w-full border-gray-300 text-gray-900 text-sm focus:outline-none block pl-4 p-2.5" 
                    placeholder="Ticker ('AAPL', 'MSFT', ... )" 
                    autoFocus
                    onChange={(e) => {
                        setTickerInput(e.target.value)
                        setError(null);
                    }} 
                    value={tickerInput}
                    />

                </div>
                <Button 
                    type="submit"
                    variant="contained"
                >
                    Add ticker
                </Button>
            </div>
        </form>
      {error && (<span className='font-semibold text-xl text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'>{error.code}: {error.description}<br /></span>)}
    </div>
  )
}
