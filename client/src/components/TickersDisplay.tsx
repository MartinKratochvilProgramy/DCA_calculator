import  { FC } from 'react'
import Plot from 'react-plotly.js';  

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
    getData: () => void;
}

export const TickersDisplay: FC<Props> = ({ data, getData }) => {

    const allSeriesLayout =  {
        yaxis: {
            title: {
                text: `Value ($)`,
                font: {
                    size: 18,
                }
                },
        },
        margin: {
            t: 10,
            b: 20
        },
        autosize: true,
        legend:{
            x:0 ,
            y: 1.2, 
          }
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
    <div className='flex flex-col justify-center items-center w-full'>
        <div className='flex justify-center items-center w-full min-h-[260px] md:min-h-[450px]'>
            <Plot
                layout={allSeriesLayout}
                data={allSeriesData}
                useResizeHandler
                className="w-[90%] sm:w-[60%] h-[260px] md:h-full"
            />
        </div>
    </div>
  )
}
