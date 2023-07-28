import axios from 'axios'

let token = localStorage.getItem('token')

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}

const logIn = async (newObject) => {
  const request = axios.post('/api/login', newObject)
  return request.then((response) => response.data)
}

const signUp = async (newObject) => {
  const request = axios.post('/api/users', newObject)
  return request.then((response) => response.data)
}

const getAllUsers = async () => {
  return axios.get('/api/users').then((response) => response.data)
}

const getUserWithToken = async () => {
  console.log('token', token)
  return axios
    .get('/api/users/token', axiosConfig)
    .then((response) => response.data)
}

export default { logIn, signUp, getAllUsers, getUserWithToken }
