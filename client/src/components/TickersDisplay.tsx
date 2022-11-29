import React, { FC } from 'react'
import Plot from 'react-plotly.js';  
import Button from '@mui/material/Button'; 

interface TickerData {
    ticker: string;
    dates: string[];
    values: number[];
}

interface SeriesData {
    x: string[];
    y: number[];
    mode: string;
    name: string
}

interface Props {
    data: TickerData[];
    inputComplete: boolean;
    getData: () => void;
}

export const TickersDisplay: FC<Props> = ({ data, inputComplete, getData }) => {

    const allSeriesLayout =  {
        xaxis: {
            title: {
                text: 'Time',
                font: {
                    size: 18,
                }
                },
        },
        yaxis: {
            title: {
                text: `Value`,
                font: {
                    size: 18,
                }
                },
        },
        autosize: true, 
    } ;

    function initSeriesData(ticker: TickerData): SeriesData {
        const seriesData =
            {
                x: ticker.dates,
                y: ticker.values,
                mode: 'lines',
                name: ticker.ticker
            }
        
        return seriesData;
    }

    const allSeriesData: SeriesData[] = [];
    for (const ticker of data) {    
        allSeriesData.push(initSeriesData(ticker));
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        <div>
            {inputComplete ?
                <Button 
                    variant="contained"
                    onClick={getData}
                    >
                    Load data
                </Button>
            : 
                <Button 
                    variant="contained"
                    disabled
                    >
                    Load data
                </Button>
            }
        </div>
        <Plot
            layout={allSeriesLayout}
            data={allSeriesData}
        />
    </div>
  )
}
