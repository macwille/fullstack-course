import diagnoseData from '../../data/diagnoses';
import { Diagnosis, newDiagnosis } from '../../types';

const generateID = (): string => {
  const id = Math.floor(Math.random() * 99999999);
  return id.toString();
};

const getEntries = (): Array<Diagnosis> => {
  return diagnoseData;
};

const getCode = (byCode: string): Diagnosis | undefined => {
  const diagnosis = diagnoseData.find(d => d.code === byCode);
  return diagnosis;
};

const addEntry = (entry: newDiagnosis): Diagnosis => {
  const newEntry = {
    id: generateID(),
    ...entry,
  };
  diagnoseData.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getCode,
  addEntry
};