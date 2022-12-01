import React, { FC } from 'react'
import Button from '@mui/material/Button'; 
import LoadingButton from '@mui/lab/LoadingButton';
import { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

interface Props {
    waitingForData: boolean;
    inputComplete: boolean;
    modifyStartDate: (startDate: Dayjs) => void;
    setStartAmount: (startAmount: number) => void;
    setIncrementAmount: (incrementAmount: number) => void;
    getData: () => void;
}

export const SelectRangesForm: FC<|Props>  = ({ waitingForData, inputComplete, modifyStartDate, setStartAmount, setIncrementAmount, getData }) => {

    const [dateValue, setDateValue] = React.useState<Dayjs | null>(null);

    function handleChange(newValue: Dayjs | null): void {
        if (newValue === null) return;

        setDateValue(newValue);
        modifyStartDate(newValue);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        getData();
    }

  return (
    <div className='flex justify-center items-center'>
        <form 
            onSubmit={(e) => {handleSubmit(e)}}
            className='flex justify-center items-center flex-col p-4 rounded '>
            <div className='flex flex-col mb-4 space-y-4'>
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
            </div>
            
            <div className='min-h-[36px] flex'>
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
                        type='submit'
                        disabled={!inputComplete}
                    >
                        Load data
                    </Button>
                }
            </div>

        </form>
    </div>
  )
}
