// src/services/mlApi.js
import axios from 'axios'

const mlInstance = axios.create({
  baseURL: import.meta.env.VITE_ML_URL || 'http://ml:8000', // FastAPI runs here by default
  headers: {
    'Content-Type': 'application/json',
  },
})

export default mlInstance
