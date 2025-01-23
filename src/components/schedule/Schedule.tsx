import {Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectSchedule, selectScheduleLoading} from "../../state/schedule/ScheduleSelectors.ts";
import SpinnerLoader from "../spinner-loader/SpinnerLoader.tsx";

export default function Schedule() {
    const schedule = useSelector(selectSchedule);
    const isLoading = useSelector(selectScheduleLoading);

    function renderSchedule(){
        if(schedule.length === 0) {
            return <br/>;
        }

        const scheduleContent = schedule.map((entry) => (
                <Row className='border-3 border-top border-dark'>
                    <Col className='border-3 border-end border-dark text-start'>{entry[0]}</Col>
                    <Col className='border-3 border-end border-dark'>{entry[1][0]}</Col>
                    <Col>{entry[1][1]}</Col>
                </Row>
        ));

        return (
            <>
                <Container className='square border border-3 border-dark w-50 rounded-4'>
                    <Row>
                        <h3>Schedule</h3>
                    </Row>
                    <Row className='border-3 border-top border-dark'>
                        <Col className='border-3 border-end border-dark'><h5>Date</h5></Col>
                        <Col className='border-3 border-end border-dark'><h5>Primary</h5></Col>
                        <Col><h5>Secondary</h5></Col>
                    </Row>
                    {scheduleContent}
                </Container>
            </>
        );
    }

    return (
        <>
            {isLoading ? <SpinnerLoader/> : renderSchedule()}
        </>
    )
}