import axios from 'axios'
import.meta.env

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://56.228.30.161:5000/api', // adjust to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
