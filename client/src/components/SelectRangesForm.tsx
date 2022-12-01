import React, { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

interface Props {
    modifyStartDate: (startDate: Dayjs) => void;
    setStartAmount: (startAmount: number) => void;
    setIncrementAmount: (incrementAmount: number) => void;
}

export const SelectRangesForm: FC<|Props>  = ({ modifyStartDate, setStartAmount, setIncrementAmount }) => {

    const [dateValue, setDateValue] = React.useState<Dayjs | null>(null);

    function handleChange(newValue: Dayjs | null): void {
        if (newValue === null) return;

        setDateValue(newValue);
        modifyStartDate(newValue);
    }

  return (
    <div className='flex justify-center items-center'>
        <form 
            className='flex flex-col p-4 rounded '>
            <div className='flex flex-col mb-8 space-y-2'>
                <TextField 
                    id="standard-basic" 
                    label="Starting amount ($)" 
                    variant="standard" 
                    type={'number'}
                    onChange={(e) => setStartAmount(parseFloat(e.target.value))}
                    />
                <TextField 
                    id="standard-basic" 
                    label="Monthly investment ($)" 
                    variant="standard" 
                    type={'number'}
                    onChange={(e) => setIncrementAmount(parseFloat(e.target.value))}
                />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                label="Starting date"
                inputFormat="DD/MM/YYYY"
                value={dateValue}
                onChange={handleChange}
                disableFuture={true}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </form>
    </div>
  )
}
