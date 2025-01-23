import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ScheduleEntry = [string, string[]];

interface ScheduleState {
    schedule: ScheduleEntry[];
    isLoading: boolean;
}

const initialState: ScheduleState = {
    schedule: [],
    isLoading: false
};

const scheduleSlice = createSlice(
    {
        name: 'schedule',
        initialState: initialState,
        reducers: {
            setSchedule: (state, action: PayloadAction<ScheduleEntry[]>) => {
                state.schedule = action.payload;
            },
            enableLoading: (state) => {
                state.isLoading = true;
            },
            disableLoading: (state) => {
                state.isLoading = false;
            }
        }
    }
)

export const scheduleActions = scheduleSlice.actions;
export default scheduleSlice.reducer;