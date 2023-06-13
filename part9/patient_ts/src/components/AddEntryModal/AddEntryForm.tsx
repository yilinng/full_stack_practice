import { useState, SyntheticEvent } from 'react'

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from '@mui/material'

import {
  Diagnosis,
  HealthCheckRating,
  NewOccupationalHealthcareEntry,
  NewHospitalEntry,
  NewHealthCheckEntry,
} from '../../types'

import HealthCheck from './entry/HealthCheck'

import Hospital from './entry/Hospital'

import OccupationalHealthcare from './entry/OccupationalHealthcare'

interface Props {
  onClose: (data: string) => void
  onSubmit: (
    values:
      | NewOccupationalHealthcareEntry
      | NewHospitalEntry
      | NewHealthCheckEntry
  ) => void
  error?: string
  type: string
  diagnoses: Diagnosis[]
}

const AddEntryForm = ({ onClose, onSubmit, error, type, diagnoses }: Props) => {
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([])
  const [pickDiagnose, setPickDiagnose] = useState('')
  //health check
  const [healthCheckRating, setHealthCheckRating] = useState<number>(
    HealthCheckRating.Healthy
  )

  //OccupationalHealthcare
  const [employerName, setEmployerName] = useState('')
  const [sickLeave, setSickLeave] = useState({
    startDate: '',
    endDate: '',
  })

  //hospital
  const [discharge, setDischarge] = useState({
    date: '',
    criteria: '',
  })

  const filterDiagnosisCodes = (item: Diagnosis) => {
    console.log('filterDiagnosisCodes', item)
    const findDiagnose = diagnoses.find((d) => d.code === item.code)
    if (findDiagnose) {
      if (window.confirm(`Do you wnat to delete this diagnose ${item.code}?`)) {
        const filterDiagnose = diagnosisCodes.filter(
          (g) => g.code !== item.code
        )
        setDiagnosisCodes(filterDiagnose)
      }
    }
  }

  const onDiagnoseChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault()

    if (typeof event.target.value === 'string') {
      const value = event.target.value

      console.log('value', value)

      const findDiagnose = diagnoses.find((d) => d.code === value)

      console.log('findDiagnose', findDiagnose)
      const filterDiagnose = diagnosisCodes.filter((g) => g.code === value)

      console.log('filterDiagnose', filterDiagnose)

      if (findDiagnose) {
        setPickDiagnose(value)

        if (!diagnosisCodes.length) {
          setDiagnosisCodes([...diagnosisCodes, findDiagnose])
          console.log('diagnosisCodes no value', diagnosisCodes)
          return
        }

        if (filterDiagnose.length < 1) {
          setDiagnosisCodes([...diagnosisCodes, findDiagnose])
          console.log('filterDiagnose < 1', filterDiagnose)
        }
      }
    }
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()

    console.log('description', description)
    console.log('date', date)
    console.log('specialist', specialist)
    console.log('diagnosisCodes', diagnosisCodes)
    console.log('pickDiagnose', pickDiagnose)
    console.log('healthCheckRating', healthCheckRating)

    console.log('employerName', employerName)
    console.log('sickLeave', sickLeave)
    console.log('discharge', discharge)

    const codeFromDiagnosisCodes = diagnosisCodes.map((item) => item.code)

    console.log('codeFromDiagnosisCodes', codeFromDiagnosisCodes)

    if (type === 'HealthCheck') {
      if (diagnosisCodes.length) {
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes: codeFromDiagnosisCodes,
          healthCheckRating,
          type,
        })
      } else {
        onSubmit({ description, date, specialist, healthCheckRating, type })
      }
    }

    if (type === 'Hospital') {
      if (diagnosisCodes.length) {
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes: codeFromDiagnosisCodes,
          discharge,
          type,
        })
      } else {
        onSubmit({ description, date, specialist, discharge, type })
      }
    }

    if (type === 'OccupationalHealthcare') {
      if (diagnosisCodes.length) {
        if (sickLeave.startDate && sickLeave.endDate) {
          onSubmit({
            description,
            date,
            specialist,
            diagnosisCodes: codeFromDiagnosisCodes,
            employerName,
            type,
            sickLeave,
          })
        } else {
          onSubmit({
            description,
            date,
            specialist,
            diagnosisCodes: codeFromDiagnosisCodes,
            employerName,
            type,
          })
        }
      } else {
        if (sickLeave.startDate && sickLeave.endDate) {
          onSubmit({
            description,
            date,
            specialist,
            employerName,
            type,
            sickLeave,
          })
        } else {
          onSubmit({ description, date, specialist, employerName, type })
        }
      }
    }
  }

  const TypeForm = (type: string) => {
    switch (type) {
      case 'HealthCheck':
        return (
          <HealthCheck
            diagnoses={diagnoses}
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        )

      case 'Hospital':
        return <Hospital discharge={discharge} setDischarge={setDischarge} />

      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcare
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        )

      default:
        return null
    }
  }

  return (
    <div style={{ border: '1px dashed', padding: '25px 25px 40px 25px' }}>
      <h4>New {type} entry</h4>
      <form onSubmit={addEntry}>
        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          variant='standard'
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label='date'
          type='date'
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          variant='standard'
          style={{ margin: '10px 0' }}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label='specialist'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          variant='standard'
          InputLabelProps={{ shrink: true }}
          required
        />

        <InputLabel style={{ margin: '10px  0' }}>Diagnosis codes</InputLabel>
        <div
          className='diagnosisCodes'
          style={{
            margin: '20px  0',
            border: '1px solid',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {diagnosisCodes.map((item) => (
            <span
              key={item.code}
              style={{ margin: '8px', padding: '10px' }}
              onClick={() => filterDiagnosisCodes(item)}
            >
              {item.code}
            </span>
          ))}
        </div>

        <InputLabel style={{ margin: '10px  0' }}>Diagnose List</InputLabel>

        <Select fullWidth value={pickDiagnose} onChange={onDiagnoseChange}>
          {diagnoses.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.name}
            </MenuItem>
          ))}
        </Select>

        {TypeForm(type)}

        <Grid style={{ padding: '10px 0' }}>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              style={{ float: 'left' }}
              type='button'
              onClick={() => onClose('fromForm')}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type='submit'
              variant='contained'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddEntryForm
