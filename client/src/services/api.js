import axios from 'axios'
import.meta.env

// Ensure VITE_API_URL does not duplicate path segments. Expect value like https://example.com or https://example.com/api
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://56.228.30.161:5000'
// remove trailing slash
let normalizedApiUrl = rawApiUrl.replace(/\/+$/, '')
// If the provided URL already includes a trailing '/api', strip it then append a single '/api'
normalizedApiUrl = normalizedApiUrl.replace(/\/api$/i, '')
const apiRoot = `${normalizedApiUrl}/api`

const instance = axios.create({
  baseURL: apiRoot, // base URL is the server API root (ends with /api)
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
