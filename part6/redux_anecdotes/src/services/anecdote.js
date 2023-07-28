import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  const object = { content, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateItem = async (obj) => {
  const object = { content: obj.content, id: obj.id, votes: obj.votes + 1 }
  const response = await axios.put(`${baseUrl}/${obj.id}`, object)
  return response.data
}

const exportedobj = {
  getAll,
  createNew,
  updateItem,
}

export default exportedobj
