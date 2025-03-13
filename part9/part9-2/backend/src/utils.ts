import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseString = (field: unknown, nameField: string): string => {
    if (!isString(field)) {
        throw new Error(`Incorrect field ${nameField}: ${field}`);
    }
    return field;
};

const parseDate = (date: unknown): string => {
    if(!isString(date) || !isDate(date)) {
        throw new Error(`Incorrect date: ${date}`);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)){
        throw new Error(`Incorrect gender ${gender}`);
    }

    return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing object');
    }

    if (!('name' in object) || !('dateOfBirth' in object) || !('ssn' in object) || !('gender' in object) || !('occupation' in object)) {
        throw new Error('Incorrect or missing fields');
    }

    const newPatient: NewPatient = {
        name: parseString(object.name, 'name'),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn, 'ssn'),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation, 'occupation'),
        entries: []
    }

    return newPatient;
};

export default toNewPatient;