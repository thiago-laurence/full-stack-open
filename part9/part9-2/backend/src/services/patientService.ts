import patientData from '../../data/patients';
import { PublicPatient } from '../types';

const getPublicPatients = (): PublicPatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));

}

export default {
    getPublicPatients
};