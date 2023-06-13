import axios from 'axios'
import { Diary, NewDiary } from '../type'

const baseUrl = 'http://localhost:3001/api/diaries'

/*
interface ValidationError {
  message: string
  errors: Record<string, string[]>
}
*/
export const getAllDiaries = async () => {
  const response = await axios.get<Diary[]>(baseUrl)
  return response.data
}

export const createDiary = async (object: NewDiary) => {
  try {
    const response = await axios.post<Diary>(baseUrl, object)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error)
      console.error(error.response?.data)
      throw new Error(error.response?.data)

      // Do something with this error...
    } else {
      console.error(error)
      //throw new Error(error)
    }
  }
}
