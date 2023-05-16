import axios from 'axios'
const baseUrl = '/api/blogs'

let token = localStorage.getItem('token')

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createItem = async (newObject) => {
  console.log('token', token)
  const request = axios.post(baseUrl, newObject, axiosConfig)
  return request.then((response) => response.data)
}

const updateItem = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, axiosConfig)
  return request.then((response) => response.data)
}

const deleteItem = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, axiosConfig)
  return request.then((response) => response.data)
}

export default { getAll, createItem, updateItem, deleteItem }
