import Button from "react-bootstrap/Button";
import {useGenerateScheduleMutation} from "../../state/api/ApiSlice.ts";
import {ApiService} from "../../services/ApiService.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    selectEndDate,
    selectPeople,
    selectStartDate
} from "../../state/schedule-parameters/ScheduleParametersSelectors.ts";
import {scheduleActions} from "../../state/schedule/ScheduleSlice.ts";

export default function GenerateScheduleButton() {
    const [generateSchedule]
        = useGenerateScheduleMutation();
    const startDate = useSelector(selectStartDate);
    const endDate = useSelector(selectEndDate);
    const people = useSelector(selectPeople);

    const dispatch = useDispatch()

    const handleSubmit = async () => {
        try {
            dispatch(scheduleActions.enableLoading());

            const response = await generateSchedule(ApiService.getGenerateScheduleRequestBody(startDate, endDate, people));
            dispatch(scheduleActions.setSchedule(response.data))

            dispatch(scheduleActions.disableLoading());
        } catch (error) {
            console.error('Failed to generate schedule:', error);
        }
    }

    return (
        <Button
            variant="success"
            className='mt-4 mb-5 w-25 mx-auto'
            onClick={handleSubmit}
        >
            Generate schedule
        </Button>
    )
}