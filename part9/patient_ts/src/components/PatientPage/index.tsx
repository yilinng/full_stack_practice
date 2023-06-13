import { useState } from 'react'
import { Patient, Diagnosis, Entry } from '../../types'

import { Male, Female, AltRoute } from '@mui/icons-material'
import { Button } from '@mui/material'

import { useParams } from 'react-router-dom'
import Hospital from './entry/Hospital'
import OccupationalHealthcare from './entry/OccupationalHealthcare'
import HealthCheck from './entry/HealthCheck'

import AddEntryModal from '../AddEntryModal/index'
import AddEntryForm from '../AddEntryModal/AddEntryForm'

import {
  NewOccupationalHealthcareEntry,
  NewHospitalEntry,
  NewHealthCheckEntry,
} from '../../types'

import patientService from '../../services/patients'

import axios from 'axios'

interface Props {
  patients: Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
  diagnoses: Diagnosis[]
}

const PatientPage = ({ patients, setPatients, diagnoses }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [type, setType] = useState<string>('Hospital')
  const [nextClick, setNextClick] = useState<boolean>(false)

  console.log('type...', type)

  const openModal = (): void => setModalOpen(true)

  const closeModal = (data: string): void => {
    setModalOpen(false)
    setError(undefined)

    if (data) {
      console.log('close modal data', data)
      setNextClick(false)
    }
  }
  //console.log(diagnoses)

  const id = useParams().id
  const patient = patients.find((n) => n.id === id)
  console.log('patient ', patient)

  if (patient === undefined || !id) {
    return null
  }

  const submitNewEntry = async (
    values:
      | NewHealthCheckEntry
      | NewHospitalEntry
      | NewOccupationalHealthcareEntry
  ) => {
    try {
     
      const entry = await patientService.updateEntry(id, values)
    
      const entries = patient.entries?.concat(entry)

      patient.entries = entries

      const updatepatient = patients.map((item) => {
        if (item.id === patient.id) {
          return patient
        }
        return item
      })


      setPatients(updatepatient)

      setNextClick(false)
      
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          )
          console.error(message)
          setError(message)
        } else {
          setError('Unrecognized axios error')
        }
      } else {
        console.error('Unknown error', e)
        setError('Unknown error')
      }
    }
  }

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    console.log('entry', entry)

    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheck entry={entry} diagnoses={diagnoses} />

      case 'Hospital':
        return <Hospital entry={entry} diagnoses={diagnoses} />

      case 'OccupationalHealthcare':
        return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />

      default:
        return null
    }
  }

  return (
    <div className='App'>
      <div>
        <span style={{ fontSize: '30px', fontWeight: 700 }}>
          {patient.name}
        </span>
        {patient.gender === 'male' && (
          <Male color='primary' fontSize='large'></Male>
        )}
        {patient.gender === 'female' && (
          <Female color='action' fontSize='large'></Female>
        )}
        {patient.gender === 'other' && (
          <AltRoute color='success' fontSize='large'></AltRoute>
        )}
      </div>
      <h3>ssn: {patient.ssn}</h3>
      <h3>occupation: {patient.occupation}</h3>

      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onClose={closeModal}
        setType={setType}
        setNextClick={setNextClick}
      />

      {type && nextClick && (
        <AddEntryForm
          onClose={closeModal}
          onSubmit={submitNewEntry}
          error={error}
          type={type}
          diagnoses={diagnoses}
        />
      )}

      <h3>entries</h3>

      {patient.entries?.length ?
        patient.entries.map((entry, idx) => (
          <div className='entryList' key={idx} style={{ margin: '10px 0' }}>
            {EntryDetails({ entry: entry })}
          </div>
        )) : <div>no data to display</div>}

      <Button variant='contained' onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  )
}

export default PatientPage
