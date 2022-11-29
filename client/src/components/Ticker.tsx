import React, { FC } from 'react'

interface Props {
    ticker: string;
    deleteTicker: (tickers: string) => void;
}

export const Ticker: FC<Props> = ({ ticker, deleteTicker}) => {
  return (
    <div className='border-solid border-red-600 border-[1px]'>
        {ticker}
    </div>
  )
}
