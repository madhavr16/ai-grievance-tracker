import axios from 'axios'
import.meta.env

// Ensure VITE_API_URL does not duplicate path segments. Expect value like https://example.com or https://example.com/api
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://56.228.30.161:5000'
const normalizedApiUrl = rawApiUrl.replace(/\/+$/, '') // remove trailing slash

const instance = axios.create({
  baseURL: normalizedApiUrl, // we'll include the /api segment in requests as needed on the client side
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
