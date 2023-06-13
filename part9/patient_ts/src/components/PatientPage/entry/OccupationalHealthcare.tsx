import React from 'react'
import { Entry, Diagnosis } from '../../../types'
import { Work } from '@mui/icons-material'

interface Props {
  entry: Entry
  diagnoses: Diagnosis[]
}

export default function OccupationalHealthcare({
  entry,
  diagnoses,
}: Props) {
  return (
    <div style={{ border: '2px solid', borderRadius: '20px', padding: '10px' }}>
      <h3>OccupationalHealthcareEntry</h3>
      <div className='date'>
        <p>
          {entry.date} <Work fontSize='large'></Work>
        </p>
      </div>
      <div className='description'>
        <p>{entry.description}</p>
      </div>
      <div className='diagnose'>
        <p>diagnose by {entry.specialist}</p>
      </div>
    </div>
  )
}
