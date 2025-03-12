import express from 'express';
import diagonsesRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patient';
const app = express();

import cors from 'cors';
app.use(cors());

app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagonsesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});