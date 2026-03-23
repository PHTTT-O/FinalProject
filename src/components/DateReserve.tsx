'use client'
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"

type Props = {
    onDateChange: (value: Dayjs | null) => void
}

export default function DateReserve({ onDateChange }: Props){
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker onChange={(value) => onDateChange(value)} />
        </LocalizationProvider>
    );
}