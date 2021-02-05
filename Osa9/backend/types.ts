export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  ssn: string;
  dateOfBirth: string;
  name: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}
export type NonSensitivePatientData = Omit<Patient, 'ssn'>;
export type NoEntriesPatient = Omit<Patient, 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type newDiagnosis = Omit<Diagnosis, 'id'>;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge?: {
    date: string;
    criteria: string;
  };
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheck extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheck;