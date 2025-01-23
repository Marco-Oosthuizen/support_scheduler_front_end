import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button'
import PersonsContainer from "./components/persons-container/PersonsContainer.tsx";
import {Col, Row, Stack} from "react-bootstrap";
import Schedule from "./components/schedule/Schedule.tsx";
import DateSelector from "./components/date-selector/DateSelector.tsx";
import {useDispatch, useSelector} from "react-redux";
import {scheduleParametersActions} from './state/schedule-parameters/ScheduleParametersSlice.ts'
import {selectEndDate, selectStartDate} from "./state/schedule-parameters/ScheduleParametersSelectors.ts";
import GenerateScheduleButton from "./components/generate-schedule-button/GenerateScheduleButton.tsx";

function App() {
    const startDate = useSelector(selectStartDate)
    const endDate = useSelector(selectEndDate)
    const dispatch = useDispatch()

  return (
    <>
        <Row className='w-50 p-0 mb-5'>
            <Col>
                <DateSelector
                    label='Start Date'
                    date={startDate}
                    updateFunction={scheduleParametersActions.updateStartDate}
                ></DateSelector>
            </Col>
            <Col>
                <DateSelector
                    label='End Date'
                    minDate={startDate ?? undefined}
                    date={endDate}
                    updateFunction={scheduleParametersActions.updateEndDate}
                ></DateSelector>
            </Col>
        </Row>


        <PersonsContainer></PersonsContainer>

        <Stack>
            <Button variant="primary" className='mt-4 w-25 mx-auto' onClick={() => dispatch(scheduleParametersActions.addPerson())}>
                Add person
            </Button>
            <GenerateScheduleButton></GenerateScheduleButton>
        </Stack>
        <Schedule></Schedule>


    </>
  )
}

export default App
