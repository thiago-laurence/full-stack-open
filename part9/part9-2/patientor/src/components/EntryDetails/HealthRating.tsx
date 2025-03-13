import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Rating as Score } from '@mui/material';
import { HealthCheckRating } from '../../types';

const HealthRating = ({ rating }: { rating: HealthCheckRating }) => {
    return (
        <div>
            <h3><HealthAndSafetyIcon /></h3>
            <Score
                value={rating}
                readOnly
            />
        </div>
    );
};

export default HealthRating;