import axios from 'axios'
const baseUrl = '/api/login'

const logIn = async (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

export default { logIn }
