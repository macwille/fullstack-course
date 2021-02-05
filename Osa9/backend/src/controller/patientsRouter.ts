import express from 'express';
import patientService from '../services/patientService';
import toNewEntry from '../utils/toNewEntry';
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

patientRouter.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const patient = patientService.getFull(id);
  console.log(body);

  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const updatedPatient = patientService.addEntry(id, newEntry);
      res.json(updatedPatient);
    } catch (e) {
      res.status(400).send(e.message);
    }
    res.send(patient);
  } else {
    res.status(400).send('No user found');
  }

});

export default patientRouter;