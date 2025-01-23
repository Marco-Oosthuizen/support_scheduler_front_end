import PersonRow from "./person-row/PersonRow.tsx";
import {Stack} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectPeople} from "../../state/schedule-parameters/ScheduleParametersSelectors.ts";

export default function PersonsContainer() {
    const people = useSelector(selectPeople)

    return (
        <>
            <Stack gap={3}>
                {people.map((person, index) => (
                    <PersonRow
                        personIndex={index}
                        key={index}
                        person={person}
                    >
                    </PersonRow>
                ))}
            </Stack>
        </>
    )
}