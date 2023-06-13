import { Entry, Diagnosis } from '../../../types'
import { Healing } from '@mui/icons-material'

interface Props {
  entry: Entry
  diagnoses: Diagnosis[]
}

export default function HospitalEntry({ entry, diagnoses }: Props) {
  /*
  const findByCode = (diagnosisCode: String) => {
    const diagnose = diagnoses.filter(
      (diagnose) => diagnose.code === diagnosisCode
    )[0]
    if (diagnose) {
      return diagnose.name
    }
  }
  */
  return (
    <div style={{ border: '2px solid', borderRadius: '20px', padding: '10px' }}>
      <h3>HospitalEntry</h3>
      <div className='date'>
       
        <p>
          {entry.date} <Healing color='action' fontSize='large'></Healing>
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
