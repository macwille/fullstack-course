export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type healthRating = 0 | 1 | 2 | 3 | 4;

export interface Patient {
  id: number;
  SSN: string;
  dateOfBirth: string;
  name: string;
  gender: Gender;
  occupation: string;
  healthRating?: healthRating;
}
export type NonSensitivePatientData = Omit<Patient, 'SSN'>;
export type NewPatient = Omit<Patient, 'id'>;

export interface Diagnosis {
  id: number;
  patient: string;
  diagnose: string;
  latin?: string;
}

export type newDiagnosis = Omit<Diagnosis, 'id'>;