import {
  NewPatientEntry,
  Gender,
  NewOccupationalHealthcareEntry,
  parseDiagnosisCodes,
  NewHospitalEntry, 
  NewHealthCheckEntry, 
  HealthCheckRating
} from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name')
  }

  return name
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect dateOfBirth:' + dateOfBirth)
  }

  return dateOfBirth
}

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn')
  }

  return ssn
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect Gender: ' + gender)
  }
  return gender
}

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(param)
}

const parseHealthCheckRating = (healthCheckRating: number): HealthCheckRating => {
  if ( isString(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect HealthCheckRatingr: ' + healthCheckRating)
  }
  return healthCheckRating
}



const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation')
  }

  return occupation
}

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description')
  }

  return description
}

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist')
  }

  return specialist
}

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employerName')
  }

  return employerName
}

const parseCriteria = (criteria: unknown): string => {
  
  if (!isString(criteria)) {
    throw new Error('Incorrect or missing criteria')
  }
  return  criteria
}



export const toNewPatientEntry = (object: NewPatientEntry): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    }

    return newEntry
  }

  throw new Error('Incorrect data: a field missing')
}

export const toOccupationalHealthcareEntry = (
  object: NewOccupationalHealthcareEntry
): NewOccupationalHealthcareEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'employerName' in object && 'sickLeave' in object) {
    const newEntry: NewOccupationalHealthcareEntry = {
      description: parseDescription(object.description),
      date: parseDateOfBirth(object.date),
      specialist: parseSpecialist(object.specialist),
      type: object.type,
      diagnosisCodes: parseDiagnosisCodes(object),
      employerName: parseEmployerName(object.employerName),
      sickLeave: {
        startDate: parseDateOfBirth(object.sickLeave?.startDate),
        endDate:  parseDateOfBirth(object.sickLeave?.endDate)
      },
    }

    return newEntry
  }
  //miss sickLeave

  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'employerName' in object ) {
    const newEntry: NewOccupationalHealthcareEntry = {
      description: parseDescription(object.description),
      date: parseDateOfBirth(object.date),
      specialist: parseSpecialist(object.specialist),
      type: object.type,
      diagnosisCodes: parseDiagnosisCodes(object),
      employerName: parseEmployerName(object.employerName),
    }

    return newEntry
  }

  //diagnosisCodes miss and have sickLeave
  if ('description' in object && 'date' in object && 'specialist' in object && 'employerName' in object && 'sickLeave' in object) {
    const newEntry: NewOccupationalHealthcareEntry = {
      description: parseDescription(object.description),
      date: parseDateOfBirth(object.date),
      specialist: parseSpecialist(object.specialist),
      type: object.type,
      employerName: parseEmployerName(object.employerName),
      sickLeave: {
        startDate: parseDateOfBirth(object.sickLeave?.startDate),
        endDate:  parseDateOfBirth(object.sickLeave?.endDate)
      },
    }

    return newEntry
  }
  //diagnosisCodes miss and miss sickLeave

  if ('description' in object && 'date' in object && 'specialist' in object &&  'employerName' in object ) {
    const newEntry: NewOccupationalHealthcareEntry = {
      description: parseDescription(object.description),
      date: parseDateOfBirth(object.date),
      specialist: parseSpecialist(object.specialist),
      type: object.type,
      employerName: parseEmployerName(object.employerName),
    }

    return newEntry
  }

  throw new Error('Incorrect data: a field missing')
}

export const toHospitalEntry = (
  object: NewHospitalEntry
): NewHospitalEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'discharge' in object) {
    const newEntry: NewHospitalEntry = {
      description: parseDescription(object.description),
      date: parseDateOfBirth(object.date),
      specialist: parseSpecialist(object.specialist),
      type: object.type,
      diagnosisCodes: parseDiagnosisCodes(object),
      discharge: {
        date: parseDateOfBirth(object.discharge?.date),
        criteria:  parseCriteria(object.discharge?.criteria)
      },
    }

    return newEntry
  }

  throw new Error('Incorrect data: a field missing')
}

export const toHealthCheckEntry = (
  object: NewHealthCheckEntry
): NewHealthCheckEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'healthCheckRating' in object && 'diagnosisCodes' in object) {
    const newEntry: NewHealthCheckEntry = {
      description: parseDescription(object.description),
      date: parseDateOfBirth(object.date),
      specialist: parseSpecialist(object.specialist),
      type: object.type,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      diagnosisCodes: parseDiagnosisCodes(object),
    }

    return newEntry
  }

  //miss diagnosisCodes
  if ('description' in object && 'date' in object && 'specialist' in object && 'healthCheckRating' in object) {
    const newEntry: NewHealthCheckEntry = {
      description: parseDescription(object.description),
      date: parseDateOfBirth(object.date),
      specialist: parseSpecialist(object.specialist),
      type: object.type,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    }

    return newEntry
  }

  throw new Error('Incorrect data: a field missing')
}
