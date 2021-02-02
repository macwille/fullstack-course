import patientData from '../../data/patients';
import { NewPatient, NonSensitivePatientData, Patient } from '../../types';

const generateID = (): string => {
  const id = Math.floor(Math.random() * 99999999);
  return id.toString();
};

const getEntries = (): Array<Patient> => {
  return patientData;
};

const getNoSSN = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getID = (byId: string): NonSensitivePatientData | undefined => {
  const filtered = patientData.map(({ id, name, dateOfBirth, gender, occupation, ssn }) => ({
    id,
    ssn,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: [],
  }));
  const patient = filtered.find(p => p.id === byId);
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: generateID(),
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNoSSN,
  getID,
  addPatient
};