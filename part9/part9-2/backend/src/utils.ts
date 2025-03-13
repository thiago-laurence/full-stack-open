import { NewPatient, Gender, Diagnosis, BaseEntry, 
    OccupationalHealthCareEntry, HospitalEntry, HealthCheckEntry, 
    NewEntry, EntryWithoutId, HealthCheckRating } 
    from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const isEntryType = (type: unknown): type is "OccupationalHealthcare" | "Hospital" | "HealthCheck" => {
    return type === "OccupationalHealthcare" || type === "Hospital" || type === "HealthCheck";
};

const parseType = (type: unknown): "OccupationalHealthcare" | "Hospital" | "HealthCheck" => {
    if (!isString(type) || !isEntryType(type)) {
        throw new Error(`Incorrect or missing type: ${type}`);
    }

    return type;
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

const parseDiagnosisCodes = (object: BaseEntry): Array<Diagnosis['code']> =>  {
    if (!('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isObject = (object: unknown): object is object => {
    return object !== null && typeof object === 'object';
};

const isBaseEntry = (object: object): object is BaseEntry => {
    return ('date' in object) && ('specialist' in object) && ('description' in object);
}

const isOccupationalHealthCareEntry = (object: NewEntry): object is OccupationalHealthCareEntry => {
    return (object.type === "OccupationalHealthcare") && ('employerName' in object);
}

const isHospitalEntry = (object: NewEntry): object is HospitalEntry => {
    return (object.type === "Hospital") && ('discharge' in object);
}

const isHealthCheckEntry = (object: NewEntry): object is HealthCheckEntry => {
    return (object.type === "HealthCheck") && ('healthCheckRating' in object);
}

const parseSickLeave = (object: unknown): { startDate: string, endDate: string } | undefined => {
    if (!isObject(object) || !('startDate' in object) || !('endDate' in object)) return (undefined);

    return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate)
    }
}

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (typeof rating !== 'number' || !Object.values(HealthCheckRating).includes(rating)) {
        throw new Error(`Incorrect health check rating: ${rating}`);
    }

    return rating;
}

export const toNewPatient = (object: unknown): NewPatient => {
    if (!isObject(object)) throw new Error('Incorrect or missing object');

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

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!isObject(object)) throw new Error('Incorrect or missing object');

    if (!isBaseEntry(object)) throw new Error('Incorrect or missing fields for base entry');

    if (!('type' in object)) throw new Error('Missing type field');

    const newEntry: NewEntry = {
        ...object,
        date: parseDate(object.date),
        specialist: parseString(object.specialist, 'specialist'),
        description: parseString(object.description, 'description'),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: parseType(object.type)
    }

    switch(newEntry.type) {
        case "OccupationalHealthcare":
            if (!isOccupationalHealthCareEntry(newEntry)) throw new Error('Incorrect or missing fields for occupational healthcare entry');
            
            const occupationalHealthCareEntry: OccupationalHealthCareEntry = {
                ...newEntry,
                employerName: parseString(newEntry.employerName, 'employerName'),
                sickLeave: parseSickLeave(newEntry.sickLeave)
            };
            
            return occupationalHealthCareEntry;

        case "Hospital":
            if (!isHospitalEntry(newEntry)) throw new Error('Incorrect or missing fields for hospital entry');

            const hospitalEntry: HospitalEntry = {
                ...newEntry,
                discharge: {
                    date: parseDate(newEntry.discharge.date),
                    criteria: parseString(newEntry.discharge.criteria, 'criteria')
                }
            };

            return hospitalEntry;

        case "HealthCheck":
            if (!isHealthCheckEntry(newEntry)) throw new Error('Incorrect or missing fields for health check entry');

            const healthCheckEntry: HealthCheckEntry = {
                ...newEntry,
                healthCheckRating: parseHealthCheckRating(newEntry.healthCheckRating)
            };

            return healthCheckEntry;
            
        default:
            throw new Error('Incorrect or missing type field');
    }
};