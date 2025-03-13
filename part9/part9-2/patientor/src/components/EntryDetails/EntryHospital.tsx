import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { HospitalEntry } from '../../types';

const EntryHospital = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <div>
            <h3>{entry.date} <LocalHospitalIcon /></h3>
            <p>{entry.description}</p>
            <p>Discharge: {entry.discharge.date} - {entry.discharge.criteria}</p>
            <p>Diagnose by {entry.specialist}</p>
        </div>
    );
};

export default EntryHospital;