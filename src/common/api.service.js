import axios from 'axios'

async function getJSON(response) {
  if (response.status === 204) return '' // no content, return empty string

  return response.data
}

function apiService(endpoint, method, data) {
  const options = {
    url: `http://127.0.0.1:8000/api/${endpoint}`,
    method: method || 'GET', // GET -> default method
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: data !== undefined ? JSON.stringify(data) : null,
  }

  return (
    axios(options)
      .then(getJSON)
      .catch(error => {
        throw new Error(`API ${error}`)
      })
  )
}

export { apiService }