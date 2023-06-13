import { useState, useEffect } from 'react'
import { TextField, InputLabel } from '@mui/material'

interface Props {
  employerName: string
  setEmployerName: React.Dispatch<React.SetStateAction<string>>
  sickLeave: { startDate: string; endDate: string }
  setSickLeave: React.Dispatch<
    React.SetStateAction<{ startDate: string; endDate: string }>
  >
}

export default function HospitalEntry({
  employerName,
  setEmployerName,
  sickLeave,
  setSickLeave,
}: Props) {
  const [startDate, setStartDate] = useState(sickLeave.startDate)
  const [endDate, setEndDate] = useState(sickLeave.endDate)

  useEffect(() => {
    if (startDate && endDate) {
      console.log('startDate', startDate)
      console.log('endDate', endDate)
      setSickLeave({ startDate, endDate })
    }
  }, [startDate, endDate, setSickLeave])

  return (
    <>
      <TextField
        label='EmployerName'
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        variant='standard'
        InputLabelProps={{ shrink: true }}
        style={{ margin: '10px 0px' }}
        required
      />

      <InputLabel style={{ margin: '10px  0' }}>sickLeave</InputLabel>

      <TextField
        label='start'
        fullWidth
        value={startDate}
        type='date'
        onChange={({ target }) => setStartDate(target.value)}
        variant='standard'
        style={{ margin: '10px' }}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label='end'
        fullWidth
        value={endDate}
        type='date'
        onChange={({ target }) => setEndDate(target.value)}
        variant='standard'
        style={{ margin: '10px' }}
        InputLabelProps={{ shrink: true }}
      />
    </>
  )
}
