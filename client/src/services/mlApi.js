// src/services/mlApi.js
import axios from 'axios'

const mlInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // FastAPI runs here by default
  headers: {
    'Content-Type': 'application/json',
  },
})

export default mlInstance
