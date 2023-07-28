import React, { useEffect, useState } from 'react'
import { Diary, Weather, Visibility, NewDiary } from './type'
import { getAllDiaries, createDiary } from './service/diaryService'
import Error from './components/Error'

interface WeatherOption {
  value: Weather
  label: string
}

const weatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}))

interface VisibilityOption {
  value: Visibility
  label: string
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map((v) => ({
  value: v,
  label: v.toString(),
}))

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState(Visibility.Great)
  const [weather, setWeather] = useState(Weather.Sunny)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data)
    })
  }, [])

  const onWeatherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    event.preventDefault()
    if (typeof event.target.value === 'string') {
      const value = event.target.value
      const pick = Object.values(Weather).find(
        (g) => g.toString() === value
      )
      if (pick) {
        setWeather(pick)
      }
    }
  }

  const onVisibilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)

    event.preventDefault()
    if (typeof event.target.value === 'string') {
      const value = event.target.value
      const pick = Object.values(Visibility).find(
        (g) => g.toString() === value
      )
      if (pick) {
        setVisibility(pick)
      }
    }
  }

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const final:NewDiary = {
      date,
      visibility,
      weather,
      comment,
    }
  //https://stackoverflow.com/questions/65540608/how-to-pass-error-in-a-catch-once-a-promise-has-resolved  
    createDiary(final).then((data) => {
      if (data) {
        setDiaries(diaries.concat(data))                     
      }
    }).catch(err => {
      //https://stackoverflow.com/questions/37592249/js-how-to-convert-to-string-the-error-object-from-the-window-error
      console.log(err.stack)
      setError(err.stack)
    })

    
    setDate('')
    setComment('')
  }
//https://stackoverflow.com/questions/33256274/typesafe-select-onchange-event-using-reactjs-and-typescript
  return (
    <div>
      <h2>Add new entry</h2>
      {error && <Error passError={error} />}
      <form onSubmit={diaryCreation}>
        <div className='date'>
          <label htmlFor='date'> date</label>
          <input
            type='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div className='visibility'>
          <label htmlFor='visibility'> visibility</label>
          <select onChange={onVisibilityChange}>
            {visibilityOptions.map((item) => (
              <option key={item.label} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>

        <div className='weather'>
          <label htmlFor='weather'>weather</label>
          <select onChange={onWeatherChange}>
            {weatherOptions.map((item) => (
              <option key={item.label} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>

        <div className='comment'>
          <label htmlFor='comment'> comment</label>
          <input
            type='text'
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      <div className='diaryList'>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
            <p> comment: {diary.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
