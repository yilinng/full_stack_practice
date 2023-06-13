import express, { Request, Response, NextFunction } from 'express'
import patientsService from '../services/patientsService'
import { PatientEntry } from '../types'

import {
  toNewPatientEntry,
  toOccupationalHealthcareEntry,
  toHospitalEntry,
  toHealthCheckEntry,
} from '../utils'

const router = express.Router()

interface PatientRequest extends Request {
  patient?: PatientEntry
}

router.get('/', (_req, res) => {
  // console.log(patientsService.getNonSensitiveEntries())
  res.send(patientsService.getEntries())
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body)

    const addedEntry = patientsService.addPatient(newPatientEntry)

    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

router.post('/:id/entries', findById, (req: PatientRequest, res: Response) => {
  console.log('req.patient find by id', req.patient)

  const patient = req.patient

  if (!patient) {
    res.send('not found patient...')
  }

  const { type } = req.body

  try {
    if (type === 'OccupationalHealthcare') {
      const newPatientEntry = toOccupationalHealthcareEntry(req.body)

      const addedEntry = patientsService.addePatientEntry(
        patient,
        newPatientEntry
      )
      console.log('addedEntry ', addedEntry)
      res.json(addedEntry)
    }

    if (type === 'Hospital') {
      const newPatientEntry = toHospitalEntry(req.body)
      const addedEntry = patientsService.addePatientEntry(
        patient,
        newPatientEntry
      )
      console.log('addedEntry ', addedEntry)
      res.json(addedEntry)
    }

    if (type === 'HealthCheck') {
      const newPatientEntry = toHealthCheckEntry(req.body)
      const addedEntry = patientsService.addePatientEntry(
        patient,
        newPatientEntry
      )
      console.log('addedEntry ', addedEntry)
      res.json(addedEntry)
    }

    //const addedEntry = patientsService.addPatient(newPatientEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

router.get('/:id', findById, (req: PatientRequest, res: Response) => {
  res.send(req.patient)
})

function findById(
  req: PatientRequest,
  res: Response,
  next: NextFunction
): void {
  const patient = patientsService.findById(req.params.id)

  if (patient) {
    req.patient = patient
    next()
  } else {
    res.sendStatus(404).json({ message: 'id not found' })
  }
}

export default router
