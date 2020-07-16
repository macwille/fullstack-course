import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    console.log('getAll called')
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    console.log('create called object:', newObject)
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log('update called id:', id)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    console.log('delete called id:', id)
    const request = axios.delete(`${baseUrl}/${id}`)
    request.then(response => response)
}

export default {
    getAll,
    create,
    update,
    remove
}