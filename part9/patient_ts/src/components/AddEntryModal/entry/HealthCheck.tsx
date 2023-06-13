import { Diagnosis, HealthCheckRating } from '../../../types'
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface Props {
  diagnoses: Diagnosis[]
  healthCheckRating: number
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>
}


const isInteger = (num: string) => /^-?[0-9]+$/.test(num + '')

const healthCheckRatingOption = () => {
  let list = []
  for (let item in HealthCheckRating) {
    if (isInteger(item)) {
      let final = { [item]: HealthCheckRating[item] }

      list.push(final)
    }
  }
  return list
}

console.log('healthCheckRatingOption', healthCheckRatingOption())

export default function HealthCheck({
  diagnoses,
  healthCheckRating,
  setHealthCheckRating,
}: Props) {
  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault()

    if (typeof event.target.value === 'number') {
      const value = event.target.value

      console.log('value', value)

      const findByValue = healthCheckRatingOption().find((d, idx) => idx === value)

      if (findByValue) {
        

      setHealthCheckRating(value)

        console.log(' findByValue', findByValue)
      }
        
    }
  }

  return (
    <>
      <InputLabel style={{ marginTop: 20 }}>healthCheckRating</InputLabel>

      <Select
        fullWidth
        value={healthCheckRating}
        onChange={onHealthCheckRatingChange}
      >
        {healthCheckRatingOption().map((option, idx) => (
          <MenuItem key={idx} value={idx}>
            {option[idx]}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
