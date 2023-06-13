export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}


export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: {
    date: string
    criteria: string
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

export interface PatientEntry {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: string
  occupation: string
  entries?: Entry[]
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export const parseDiagnosisCodes = (object: {diagnosisCodes? : string[]}): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>

export type NewPatientEntry = Omit<PatientEntry, 'id'>
