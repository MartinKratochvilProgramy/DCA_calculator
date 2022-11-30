import React, { useState, FC } from 'react';
import { serverRoute } from '../serverRoute';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
    addTicker: (ticker: string) => void;
}

interface Error {
    code: string;
    description: string;
}

export const AddTickerForm: FC<Props> = ({ addTicker }) => {

    const [error, setError] = useState<null | Error>(null);
    const [waitingForValidation, setWaitingForValidation] = useState<boolean>(false);
    const [tickerInput, setTickerInput] = useState<string>("");

    function handleInputClick(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        
        if (tickerInput === "") return;
        
        setTickerInput("");
        setWaitingForValidation(true);

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
            setWaitingForValidation(false);
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
            <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0 text-black'>
                SELECT <span className='text-blue-600'>TICKERS</span> YOU WISH TO <span className='text-blue-600'>TRACK</span>
            </h1>
            <div className="relative flex flex-row justify-center h-full w-full">
                <div className='flex w-full'>
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
                <div className="w-4/12 flex">
                  {waitingForValidation ?
                    <LoadingButton
                      size="small"
                      variant="contained"
                      loading={true}
                      fullWidth={true}
                      disabled
                      >
                    </LoadingButton>
                  :
                  <Button 
                    type="submit"
                    size="small"
                    variant="contained"
                    fullWidth={true}
                    >
                        Add ticker
                    </Button>
                  }

                </div>
            </div>
        </form>
      {error && (<span className='font-semibold text-xl text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'>{error.code}: {error.description}<br /></span>)}
    </div>
  )
}
