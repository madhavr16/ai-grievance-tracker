import axios from 'axios'
import.meta.env

// Ensure VITE_API_URL does not duplicate path segments. Expect value like https://example.com or https://example.com/api
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://56.228.30.161:5000'
// remove trailing slash
let normalizedApiUrl = rawApiUrl.replace(/\/+$/, '')
// If the provided URL already includes a trailing '/api', strip it so client paths like '/api/...' don't become '/api/api/...'
normalizedApiUrl = normalizedApiUrl.replace(/\/api$/i, '')

const instance = axios.create({
  baseURL: normalizedApiUrl, // base URL is the server root (no trailing /api)
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
