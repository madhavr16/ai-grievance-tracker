// src/services/mlApi.js
import axios from 'axios'
import.meta.env

const mlInstance = axios.create({
  baseURL: import.meta.env.VITE_ML_URL || 'https://ai-grievance-tracker-3.onrender.com', // FastAPI runs here by default
  headers: {
    'Content-Type': 'application/json',
  },
})

export default mlInstance
