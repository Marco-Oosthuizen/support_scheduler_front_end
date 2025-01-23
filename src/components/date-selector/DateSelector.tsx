import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {useDispatch} from "react-redux";
import {Dayjs} from "dayjs";

interface DateSelectorProps {
    label: string;
    date?: Dayjs | null;
    updateFunction: Function;
    minDate?: Dayjs;
    maxDate?: Dayjs;
}

export default function DateSelector(props: DateSelectorProps) {
    const dispatch = useDispatch()

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    minDate={props.minDate}
                    maxDate={props.maxDate}
                    label={props.label}
                    value={props.date}
                    onChange={(value) => dispatch(props.updateFunction(value?.unix()))}
                />
            </LocalizationProvider>
        </>
    )
}