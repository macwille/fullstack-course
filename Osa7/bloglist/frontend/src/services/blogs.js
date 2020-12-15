import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getToken = () => {
  return token.split(" ")[1]
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const likes = newObject.likes
  newObject.likes = likes + 1
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = (blog) => {
  const request = axios.delete(`${baseUrl}/${blog.id}`)
  return request.then(reponse => blog)
}

export default { getAll, getById, create, update, setToken, getToken, deleteBlog }