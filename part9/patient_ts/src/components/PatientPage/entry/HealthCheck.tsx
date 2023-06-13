import { Entry, Diagnosis } from '../../../types'
import { MedicalServices, FavoriteBorder } from '@mui/icons-material'

interface Props {
  entry: Entry
  diagnoses: Diagnosis[]
}

export default function HealthCheck({ entry, diagnoses }: Props) {


  if ("healthCheckRating" in entry) {
    console.log('entry', entry)    
  }
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
      <h3>HealthCheckEntry</h3>
      <div className='date'>
        <p>
          {entry.date}
          <MedicalServices color='primary' fontSize='large'></MedicalServices>
        </p>
      </div>
      <div className='description'>
        <p>{entry.description}</p>
      </div>
      {"healthCheckRating" in entry &&
        <div className='healthCheckRating'>
          {Array.from(Array(entry.healthCheckRating + 1)).map((_, i) => 
            <FavoriteBorder key={i} color="success" />
          )}
        </div>
      }
      <div className='diagnose'>
       
        <p>diagnose by {entry.specialist}</p>
      </div>
    </div>
  )
}
