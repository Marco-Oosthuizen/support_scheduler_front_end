import {configureStore} from "@reduxjs/toolkit";
import scheduleParametersReducer from './schedule-parameters/ScheduleParametersSlice.ts'
import scheduleReducer from './schedule/ScheduleSlice.ts'
import {scheduleApi} from "./api/ApiSlice.ts";

export const store = configureStore({
    reducer: {
        schedule: scheduleReducer,
        scheduleParameters: scheduleParametersReducer,
        [scheduleApi.reducerPath]: scheduleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(scheduleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
