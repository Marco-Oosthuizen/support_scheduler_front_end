import {Col, Modal, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DateSelector from "../date-selector/DateSelector.tsx";
import {useState} from "react";
import {unix} from "dayjs";
import {useSelector} from "react-redux";
import {selectStartDate, selectEndDate} from "../../state/schedule-parameters/ScheduleParametersSelectors.ts";

interface DateRangeSelectModalProps {
    show: boolean;
    handleClose: () => void;
    handleAddDate: Function;
}

export default function DateRangeSelectModal({show, handleClose, handleAddDate}: DateRangeSelectModalProps) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const scheduleStartDate = useSelector(selectStartDate);
    const scheduleEndDate = useSelector(selectEndDate);

    function addDates() {
        handleAddDate(startDate, endDate);
        handleClose();
    }

    function getMinStartDateForEndDateSelector() {
        if(startDate !== null) {
            return unix(startDate);
        }

        if(scheduleStartDate !== null) {
            return scheduleStartDate;
        }

        return undefined;
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add unavailable days</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <DateSelector
                                label='Start Date'
                                minDate={scheduleStartDate ?? undefined}
                                maxDate={scheduleEndDate ?? undefined}
                                updateFunction={setStartDate}
                            />
                        </Col>
                        <Col>
                            <DateSelector
                                label='End Date'
                                minDate={getMinStartDateForEndDateSelector()}
                                maxDate={scheduleEndDate ?? undefined}
                                updateFunction={setEndDate}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addDates}>
                        Add days
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}