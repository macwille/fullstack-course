import express from 'express';
import diagnoseData from '../../data/diagnoses';

import { Diagnosis } from '../../types';
import diagnoseService from '../services/diagnoseService';

const diagnoseRouter = express.Router();
const diagnoses: Array<Diagnosis> = diagnoseData;

diagnoseRouter.get('/', (_req, res) => {
  res.send(diagnoses);
});

diagnoseRouter.get('/:code', (req, res) => {
  const { code } = req.params;
  const diagnose = diagnoseService.getCode(code);

  if (diagnose) {
    res.send(diagnose);
  } else {
    res.status(400).send('No diagnosis found');
  }
});


export default diagnoseRouter;