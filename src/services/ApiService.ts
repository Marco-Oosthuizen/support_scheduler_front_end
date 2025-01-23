import {Person} from "../state/schedule-parameters/ScheduleParametersSelectors.ts";
import {
    GenerateScheduleRequest,
    GeneticAlgorithmParametersRequestBody,
    ScheduleParametersRequestBody
} from "../state/api/ApiSlice.ts";
import {Dayjs} from "dayjs";

export const ApiService = {
    getGenerateScheduleRequestBody: (startDate: Dayjs | null,
                                     endDate: Dayjs | null,
                                     people: Person[]): GenerateScheduleRequest => {
        return {
            schedule_parameters: ApiService.getScheduleParametersRequestBody(startDate, endDate, people),
            genetic_algorithm_parameters: ApiService.getDefaultGeneticAlgorithmParameters(),
        };
    },

    getScheduleParametersRequestBody:  (startDate: Dayjs | null,
                                        endDate: Dayjs | null,
                                        people: Person[]): ScheduleParametersRequestBody => {
            if(startDate === null || endDate === null) {
                throw new Error('Start date and end date must be set');
            }

            return {
                schedule_start_date: startDate.add(1, 'day').toDate(),
                schedule_end_date: endDate.add(1, 'day').toDate(),
                devs: people.map((person) => person.name),
                dev_leave_days: people.reduce<{ [key: string]: Date[] }>((acc, person) => {
                    const unavailable_days: Date[] = [];

                    person.unavailableDays.forEach(item => {
                        if (Array.isArray(item)) {
                            let currentDate = item[0];
                            const endDate = item[1];

                            while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
                                unavailable_days.push(currentDate.toDate());
                                currentDate = currentDate.add(1, 'day');
                            }
                        } else {
                            unavailable_days.push(item.toDate());
                        }

                        return unavailable_days;
                    });

                    acc[person.name] = unavailable_days;
                    return acc;
                }, {}),
                dimensions: 2,
            }
    },

    getDefaultGeneticAlgorithmParameters: (): GeneticAlgorithmParametersRequestBody => {
        return {
            seed: 8,
            generations: 30,
            population_size: 500,
            crossover_rate: 0.7,
            mutation_rate: 0.3,
        }
    },
}