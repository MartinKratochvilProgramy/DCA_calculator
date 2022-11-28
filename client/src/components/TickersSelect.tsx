import React, { FC } from 'react'

interface Props {
    tickers: string[];
    setTickers: (tickers: string[]) => void;
    getData: () => void;
}

export const TickersSelect: FC<Props> = ({ tickers, setTickers, getData }) => {
  return (
    <div>
        Ticker Select
        <br />
        <button onClick={getData}>
            Get data!
        </button>
    </div>
  )
}
