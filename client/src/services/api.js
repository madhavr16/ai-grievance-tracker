import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://56.228.30.161:5000/api', // adjust to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
