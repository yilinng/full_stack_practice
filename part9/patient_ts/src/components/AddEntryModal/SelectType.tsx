import { ChangeEvent } from 'react'

import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Button,
} from '@mui/material'


interface Props {
  onCancel: (data: string) => void
  setType: React.Dispatch<React.SetStateAction<string>>
  setNextClick:React.Dispatch<React.SetStateAction<boolean>>
}

const SelectType = ({ onCancel, setType, setNextClick }: Props) => {
  
  const pickType = (e: ChangeEvent<HTMLInputElement>): void =>
    setType(e.target.value)
  return (
    <div>
      <FormControl>
        <FormLabel id='demo-radio-buttons-group-label'>Type</FormLabel>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='Hospital'
          name='radio-buttons-group'
          onChange={(e) => pickType(e)}
        >
          <FormControlLabel
            value='HealthCheck'
            control={<Radio />}
            label='HealthCheck'
          />
          <FormControlLabel
            value='OccupationalHealthcare'
            control={<Radio />}
            label='OccupationalHealthcare'
          />
          <FormControlLabel
            value='Hospital'
            control={<Radio />}
            label='Hospital'
          />
        </RadioGroup>
      </FormControl>
      <Grid>
        <Grid item>
          <Button
            color="error"
            variant='contained'
            style={{ float: 'left' }}
            type='button'
            onClick={() => onCancel('')}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: 'right',
            }}
            type='button'
            variant='contained'
            onClick={() => { setNextClick(true); onCancel('') } }
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default SelectType
