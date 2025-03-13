import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry, EntryWithoutId } from '../types';

const getPatients = (): Patient[] => {
    return patientData;
}

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));

}

const addPatient = (patient: NewPatient): Patient => {
    const newPatient: Patient = {
        id: uuid(),
        ...patient
    }
    patientData.push(newPatient);
    
    return newPatient;
};

const findById = (id: string): Patient | undefined => {
    const patient = patientData.find(p => p.id === id);
    return patient;
};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
    const newEntry: Entry = {
        id: uuid(),
        ...entry
    };
    patientData.map(p => p.id === patient.id ? { ...p, entries: p.entries.concat(newEntry) } : p);
    
    return newEntry;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    findById,
    addEntry
};