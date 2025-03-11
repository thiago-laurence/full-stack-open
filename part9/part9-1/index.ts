import express from 'express';
const app = express();
app.use(express.json());

import { IMC } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { IMCValues, ExerciseValues } from 'types';

app.get('/hello', (_req, res) => {
    res.send('Hello World!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }
    
    const result: IMCValues = {
        height,
        weight,
        bmi: IMC(height, weight)
    };

    res.send(result);
});

app.post('/exercises', (req, res) => {
    const { target, weekHours } = req.body;
    if (!target || !weekHours) {
        res.status(400).send({ error: 'parameters missing' });
        return;
    }

    if (isNaN(target) || !Array.isArray(weekHours) || weekHours.some(hour => isNaN(hour))) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }

    const result: ExerciseValues = calculateExercises(weekHours, target);
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});