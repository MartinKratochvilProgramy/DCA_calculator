import React, { useState, FC } from 'react';

interface Props {
    tickers: string[];
    setTickers: (ticker: string[]) => void;
}

export const AddTickerForm: FC<Props> = ({ tickers, setTickers }) => {

    const [error, setError] = useState<null | string>(null);
    const [tickerInput, setTickerInput] = useState<string>("");

    function handleInputClick(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        setTickerInput("");
        setTickers([...tickers, tickerInput])
    }

  return (
    <div>
        <form 
            onSubmit={(e) => handleInputClick(e)} 
            className="flex flex-col space-y-4 items-center">   
            <label htmlFor ="add-stock" className="sr-only">Add stock</label>
            <h1 className='text-3xl font-semibold mt-2 py-4 md:py-4 mb-0 text-black dark:text-white'>
                SELECT <span className='text-blue-600'>TICKERS</span> YOU WISH TO <span className='text-blue-600'>TRACK</span>
            </h1>
            <div className="relative flex flex-row w-8/12 md:w-8/12 h-full">
                <label htmlFor ="add-stock" className="sr-only">Ticker input</label>
                <input 
                type="text" 
                id="ticker-input" 
                className="bg-gray-100 border w-full border-gray-300 text-gray-900 text-sm focus:outline-none block pl-4 p-2.5" 
                placeholder="Ticker ('AAPL', 'MSFT', ... )" 
                autoFocus
                onChange={(e) => setTickerInput(e.target.value)} 
                value={tickerInput}
                />
                <button
                    type="submit"
                    className="flex flex-row px-7 py-3 ml-2 text-white bg-blue-600 font-medium text-sm leading-snug uppercase rounded whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Add ticker
                </button>
            </div>
        </form>
      {error && (<span className='font-semibold text-xl text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'>{error}<br /></span>)}
    </div>
  )
}
