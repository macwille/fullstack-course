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
export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;

export interface Diagnosis {
  id: number;
  code: string;
  patient: string;
  diagnose: string;
  latin?: string;
}

export type newDiagnosis = Omit<Diagnosis, 'id'>;

interface EntryBase {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface OccupationalHealthcareEntry extends EntryBase {
  type: 'OccupationalHealthcare';
  employerName: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends EntryBase {
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

interface HealthCheck extends EntryBase {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheck;