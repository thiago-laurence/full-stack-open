import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { HealthCheckEntry } from "../../types";

const EntryHealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
        <div>
            <h3>{entry.date} <HealthAndSafetyIcon /></h3>
            <p>{entry.description}</p>
            <p>Diagnose by {entry.specialist}</p>
        </div>
    );
};

export default EntryHealthCheck;