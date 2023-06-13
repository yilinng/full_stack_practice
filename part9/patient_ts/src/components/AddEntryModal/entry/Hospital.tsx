import { useState, useEffect } from 'react'
import { TextField, InputLabel } from '@mui/material'

interface Props {
  discharge: { date: string; criteria: string }
  setDischarge: React.Dispatch<
    React.SetStateAction<{ date: string; criteria: string }>
  >
}

export default function HospitalEntry({

  discharge,
  setDischarge,
}: Props) {
  const [date, setDate] = useState(discharge.date)
  const [criteria, setCriteria] = useState(discharge.criteria)

  useEffect(() => {
    if (date && criteria) {
     
      setDischarge({date,criteria })
    }
  }, [date,criteria, setDischarge])

  return (
    <>
    
      <InputLabel style={{ margin: '10px  0' }}>discharge</InputLabel>

      <TextField
        label='date'
        fullWidth
        value={date}
        type='date'
        onChange={({ target }) => setDate(target.value)}
        variant='standard'
        style={{ margin: '10px' }}
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        label='criteria'
        fullWidth
        value={criteria}
        onChange={({ target }) => setCriteria(target.value)}
        variant='standard'
        style={{ margin: '10px' }}
        InputLabelProps={{ shrink: true }}
        required
      />
    </>
  )
}
