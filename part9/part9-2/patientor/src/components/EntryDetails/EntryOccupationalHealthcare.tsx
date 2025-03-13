import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { OccupationalHealthCareEntry } from "../../types";

const EntryOccupationalHealthcare = ({ entry }: { entry: OccupationalHealthCareEntry }) => {
    return (
        <div>
            <h3>{entry.date} <MedicalInformationIcon /></h3>
            <p>{entry.description}</p>
            <p>Employer: {entry.employerName}</p>
            {entry.sickLeave ? <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p> : null}
            <p>Diagnose by {entry.specialist}</p>
        </div>
    );
};
 
export default EntryOccupationalHealthcare;