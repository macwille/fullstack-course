import patientData from '../../data/patients';
import { NewPatient, NonSensitivePatientData, Patient, Entry } from '../../types';

const generateID = (): string => {
  const id = Math.floor(Math.random() * 99999999);
  return id.toString();
};

const getEntries = (): Array<Patient> => {
  return patientData;
};

const getNoSSN = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getID = (byId: string): NonSensitivePatientData | undefined => {
  let patient = patientData.find(p => p.id === byId);
  if (patient) {
    patient.entries.forEach(e => {
      switch (e.type) {
        case 'Hospital':
          break;
        case 'HealthCheck':
          break;
        case 'OccupationalHealthcare':
          break;
        default:
          patient = undefined;
      }
    })
  }
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

const addEntry = (id: string, entry: Entry): Patient | undefined => {
  let patient = patientData.find(p => p.id === id);
  if (patient) {
    console.log(`Add entry ${entry.id} to patient ${patient?.name}`);
    return patient;
  }
  return undefined;
}

export default {
  getEntries,
  getNoSSN,
  getID,
  addEntry,
  addPatient
};