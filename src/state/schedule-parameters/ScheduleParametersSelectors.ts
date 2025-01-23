import {RootState} from "../Store.ts";
import {createSelector} from "@reduxjs/toolkit";
import {Dayjs, unix} from 'dayjs';

export const selectStartDateTimestamp = (state: RootState) => state.scheduleParameters.startDate;
export const selectEndDateTimestamp = (state: RootState) => state.scheduleParameters.endDate;
export const selectPeopleWithUnixTimestampUnavailableDates = (state: RootState) => state.scheduleParameters.people;

export const selectStartDate = createSelector(
    selectStartDateTimestamp,
    (startDate) => startDate === null ? null : unix(startDate)
);

export const selectEndDate = createSelector(
    selectEndDateTimestamp,
    (endDate) => endDate === null ? null : unix(endDate)
);

export interface Person {
    name: string,
    unavailableDays: (Dayjs | [Dayjs, Dayjs])[] //Can be single dates or date ranges as tuples
}

export const selectPeople = createSelector(
    selectPeopleWithUnixTimestampUnavailableDates,
    (people) => people.map((person): Person => ({
        ...person,
        unavailableDays: person.unavailableDays.map((date) => {
            if(Array.isArray(date)) {
                return [unix(date[0]), unix(date[1])];
            }
            return unix(date);
        })
    }))
);

