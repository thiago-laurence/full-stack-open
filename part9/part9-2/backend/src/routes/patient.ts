import express from 'express';

import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const result = patientService.getPublicPatients();    
    res.send(result);
});

router.post('/', (req, res) => {
    try{
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    }catch(error: unknown){
        let errorMessage = 'An error occurred.';
        if(error instanceof Error){
            errorMessage += ` Error: ${error.message}`;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;