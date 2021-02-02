import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNoSSN());
});

patientRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientService.getID(id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(400).send('No user found');
  }
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const newDiaryEntry = patientService.addPatient(newPatient);
    res.json(newDiaryEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }

});

export default patientRouter;