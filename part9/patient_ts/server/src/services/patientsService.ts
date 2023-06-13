import patientData from '../../data/patients'
import {
  NewPatientEntry,
  PatientEntry,
  NonSensitivePatientEntry,
  NewOccupationalHealthcareEntry,
  NewHospitalEntry,
  NewHealthCheckEntry
} from '../types'
import { v1 as uuid } from 'uuid'

const id = uuid()

let patients: PatientEntry[] = patientData

const getEntries = (): PatientEntry[] => {
  return patients
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id,
    ...entry,
  }

  patients.push(newPatientEntry)
  return newPatientEntry
}

const addePatientEntry = (
  patient: PatientEntry | undefined,
  entry: NewOccupationalHealthcareEntry | NewHealthCheckEntry | NewHospitalEntry
): NewOccupationalHealthcareEntry | NewHospitalEntry | NewHealthCheckEntry | string => {
  console.log('patient', patient)
  console.log('entry', entry)

  const newPatientEntry = {
    id,
    ...entry,
  }

  if (!patient) {
    return 'not found patient....'
  }

  const entries = patient.entries?.concat(newPatientEntry)

  patient.entries = entries

  console.log('patient', patient)

  const updatepatient = patients.map(item => {
    if (item.id === patient.id) {
      return patient
    }
    return item
  })

  patients = updatepatient

  console.log('patients', patients)

  return entry
}

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((d) => d.id === id)
  return entry
}

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  addePatientEntry,
  findById,
}
