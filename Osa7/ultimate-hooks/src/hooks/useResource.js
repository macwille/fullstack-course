import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (url) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(url)
      .then((res) =>
        setResources(res.data))
  }, [url])

  const create = async resource => {
    console.log('create called', resource)

    const response = await axios.post(url, resource)
    setResources([...resources, response.data])
  }

  const service = {
    create
  }

  return [resources, service]
}

export default useResource