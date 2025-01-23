import {Badge, Col, Container, Form, Row} from "react-bootstrap";
import { MdAddCircleOutline } from "react-icons/md";
import {BsXCircleFill, BsFillTrashFill} from "react-icons/bs"
import Button from "react-bootstrap/Button";
import './PersonRow.css'
import {useDispatch} from "react-redux";
import {scheduleParametersActions} from "../../../state/schedule-parameters/ScheduleParametersSlice.ts";
import DateRangeSelectModal from "../../date-range-select-modal/DateRangeSelectModal.tsx";
import {useState} from "react";
import {Dayjs, isDayjs} from "dayjs";
import {Person} from "../../../state/schedule-parameters/ScheduleParametersSelectors.ts";

interface PersonRowProps {
    personIndex: number;
    person: Person;
}

export default function PersonRow({personIndex, person}: PersonRowProps) {
    const dispatch = useDispatch();
    const [showUnavailableDaysModal, setShowUnavailableDaysModal] = useState(false);

    function addUnavailableDays(startDate: number, endDate: number) {
        let leaveRange: number | [number, number] = startDate === endDate
            ? startDate
            : [startDate, endDate];
        dispatch(scheduleParametersActions.addUnavailableDays({personIndex: personIndex, date: leaveRange}));
    }

    function dateToString(date: Dayjs | [Dayjs, Dayjs]): string {
        if(isDayjs(date)) {
            return date.format('YYYY/MM/DD');
        }
        return date[0].format('YYYY/MM/DD') + ' - ' + date[1].format('YYYY/MM/DD');
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={11}>
                        <Row className='square border border-3 border-dark rounded-4'>
                            <Col lg={4} className='square border-3 border-end
                            border-dark d-flex align-items-center p-0' >
                                <Form.Control
                                    type='text'
                                    placeholder='Person name'
                                    value={person.name}
                                    className='rounded-start-4 rounded-end-0'
                                    onChange={(event) =>
                                        dispatch(scheduleParametersActions.updatePersonName(
                                            {personIndex: personIndex, newName: event.target.value}))}
                                />
                            </Col>
                            <Col className='d-flex flex-wrap gap-2 align-items-center pt-2 pb-2'>
                                {person.unavailableDays.map((date, index) => (
                                    <Badge key={index} bg="dark">
                                        <Row className='ps-2'>
                                            {dateToString(date)}
                                            <Button
                                                variant='text'
                                                className='d-flex align-items-center p-0 icon-button ms-1 me-2'
                                                onClick={() => dispatch(scheduleParametersActions.removeUnavailableDays(
                                                    {personIndex: personIndex, unavailableDaysIndex: index}))}>
                                                <BsXCircleFill size='11' color='white'/>
                                            </Button>
                                        </Row>
                                    </Badge>
                                ))}
                                <Button
                                    variant='text'
                                    className='d-flex align-items-center p-0 icon-button'
                                    onClick={() => setShowUnavailableDaysModal(true)}>

                                    <MdAddCircleOutline size='24'/>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='d-flex align-items-center p-0'>
                        <Button variant='text'
                                className='icon-button' onClick={() => dispatch(
                                    scheduleParametersActions.removePerson(personIndex))}
                        >
                            <BsFillTrashFill size='24'></BsFillTrashFill>
                        </Button>
                    </Col>
                </Row>
            </Container>

            <DateRangeSelectModal
                show={showUnavailableDaysModal}
                handleClose={() => setShowUnavailableDaysModal(false)}
                handleAddDate={addUnavailableDays}/>
        </>
    )
}