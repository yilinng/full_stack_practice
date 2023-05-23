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
  const request = axios.post(baseUrl, newObject, axiosConfig)
  return request.then((response) => response.data)
}

const updateItem = async (newObject) => {
  console.log(`token ${token}`)

  const request = axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    axiosConfig
  )
  return request.then((response) => response.data)
}

const updateComment = async (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject.id}/comments`, newObject)
  return request.then((response) => response.data)
}

const deleteItem = async (newObject) => {
  const request = axios.delete(`${baseUrl}/${newObject.id}`, axiosConfig)
  return request.then((response) => response.data)
}

export default { getAll, createItem, updateItem, updateComment, deleteItem }
