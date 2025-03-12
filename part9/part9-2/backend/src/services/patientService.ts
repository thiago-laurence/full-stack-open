import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { PublicPatient, NewPatient, Patient } from '../types';

const getPublicPatients = (): PublicPatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));

}

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    }
    patientData.push(newPatient);
    
    return newPatient;
};

export default {
    getPublicPatients,
    addPatient
};