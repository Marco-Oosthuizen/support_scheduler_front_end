import {RootState} from "../Store.ts";
import {createSelector} from "@reduxjs/toolkit";
import {format} from 'date-fns';
import {WeekdayNamesAbbreviated} from "../../constants/DateTimeConstants.ts";

export const selectScheduleWithStringDates = (state: RootState) => state.schedule.schedule;
export const selectScheduleLoading = (state: RootState) => state.schedule.isLoading;

export const selectSchedule = createSelector(
    selectScheduleWithStringDates,
    (schedule) =>
        schedule.map((entry) => {
            let date = new Date(entry[0]);
            date.setDate(date.getDate() - 1);
            const dateString = format(date, 'yyyy/MM/dd');
            const weekday = WeekdayNamesAbbreviated[date.getDay()];
            return [`${dateString}\t--- (${weekday})`, entry[1]];
        })
)