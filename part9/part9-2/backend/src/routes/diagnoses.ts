import express from 'express';

import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = diagnosesService.getDiagnoses();
  res.send(result);
});

export default router;