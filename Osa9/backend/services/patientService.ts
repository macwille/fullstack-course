import patientData from '../data/patients';
import { NewPatient, NonSensitivePatientData, Patient } from '../types';

const getEntries = (): Array<Patient> => {
  return patientData;
};

const getNoSSN = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, healthRating, }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    healthRating,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: Math.max(...patientData.map(d => d.id)) + 1,
    ...entry,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNoSSN,
  addPatient
};