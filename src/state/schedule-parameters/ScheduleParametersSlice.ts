import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//Dates are stored as unix timestamps
interface PersonState {
    name: string,
    unavailableDays: (number | [number, number])[] //Can be single dates or date ranges as tuples
}

interface ScheduleParametersState {
    startDate: number | null;
    endDate: number | null;
    people: PersonState[];
}

interface UpdatePersonNamePayload {
    personIndex: number;
    newName: string;
}

interface AddUnavailableDaysPayload {
    personIndex: number;
    date: number | [number, number];
}

interface RemoveUnavailableDaysPaylod {
    personIndex: number;
    unavailableDaysIndex: number;
}

const initialState: ScheduleParametersState = {
    startDate: null,
    endDate: null,
    people: [
        {
            name: '',
            unavailableDays: [],
        }
    ]
}

const scheduleParametersSlice = createSlice({
    name: 'scheduleParameters',
    initialState: initialState,
    reducers: {
        updateStartDate: (state, action: PayloadAction<number | null>) => {
            state.startDate = action.payload;
        },
        updateEndDate: (state, action: PayloadAction<number | null>) => {
            state.endDate = action.payload;
        },
        addPerson: (state) => {
            state.people.push({name: '', unavailableDays: []});
        },
        removePerson: (state, action: PayloadAction<number>) => {
            state.people.splice(action.payload, 1);
        },
        updatePersonName: (state, action: PayloadAction<UpdatePersonNamePayload>) => {
            const payload = action.payload;
            state.people[payload.personIndex].name = payload.newName;
        },
        addUnavailableDays: (state, action: PayloadAction<AddUnavailableDaysPayload>) => {
            const payload = action.payload;
            state.people[payload.personIndex].unavailableDays.push(payload.date);
        },
        removeUnavailableDays: (state, action: PayloadAction<RemoveUnavailableDaysPaylod>) => {
            const payload = action.payload;
            state.people[payload.personIndex].unavailableDays.splice(payload.unavailableDaysIndex, 1);
        },
    }
})

export const scheduleParametersActions = scheduleParametersSlice.actions;
export default scheduleParametersSlice.reducer;