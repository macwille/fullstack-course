import express from 'express';
import diagnoseData from '../../data/diagnoses';

import { Diagnosis } from '../../types';

const diagnoseRouter = express.Router();
const diagnoses: Array<Diagnosis> = diagnoseData;

diagnoseRouter.get('/', (_req, res) => {
  res.send(diagnoses);
});

diagnoseRouter.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default diagnoseRouter;