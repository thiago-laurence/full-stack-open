import { Entry } from '../../types';
import EntryHospital from './EntryHospital';
import EntryHealthCheck from './EntryHealthCheck';
import EntryOccupationalHealthcare from './EntryOccupationalHealthcare';
import { assertNever } from '../../utils';

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <EntryHospital entry={entry} /> ;
        case "HealthCheck":
            return <EntryHealthCheck entry={entry} />;
        case "OccupationalHealthcare":
            return <EntryOccupationalHealthcare entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;