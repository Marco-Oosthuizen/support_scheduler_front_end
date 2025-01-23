import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface ScheduleParametersRequestBody {
    schedule_start_date: Date,
    schedule_end_date: Date,
    devs: String[],
    dev_leave_days: {[key: string]: Date[]}
    dimensions: number,
}

export interface GeneticAlgorithmParametersRequestBody {
    seed: number,
    generations: number,
    population_size: number,
    crossover_rate: number,
    mutation_rate: number,
}

export interface GenerateScheduleRequest {
   schedule_parameters: ScheduleParametersRequestBody,
   genetic_algorithm_parameters: GeneticAlgorithmParametersRequestBody,
}

export const scheduleApi = createApi({
    reducerPath: "scheduleApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/"}),
    endpoints: (builder) => ({
        generateSchedule: builder.mutation({
            query: (body: GenerateScheduleRequest) => ({
                url: "schedule",
                method: "POST",
                body
            })
        })
    })
});

export const {useGenerateScheduleMutation} = scheduleApi;