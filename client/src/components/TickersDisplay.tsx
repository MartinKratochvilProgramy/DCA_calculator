import React, { FC, useState, useEffect } from 'react'
import Plot from 'react-plotly.js';  
import Button from '@mui/material/Button'; 
import LoadingButton from '@mui/lab/LoadingButton';

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

    const [waitingForData, setWaitingForData] = useState<boolean>(false);

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

    function handleClick(): void {
        getData();
        setWaitingForData(true);
    }

    const allSeriesData: SeriesData[] = [];
    for (const ticker of data) {    
        allSeriesData.push(initSeriesData(ticker));
    }
    useEffect(() => {
        setWaitingForData(false);
    }, [data])
    

  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='flex min-h-[36px]'>
            {waitingForData ? 
                <LoadingButton
                    size="small"
                    variant="contained"
                    loading={true}
                    disabled
                    >
                </LoadingButton>
            :
                <Button 
                    variant="contained"
                    onClick={handleClick}
                    disabled={!inputComplete}
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
