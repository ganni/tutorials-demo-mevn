import axios from 'axios'

export default axios.create({
  baseURL:
    import.meta.env.API_BASE_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:6868/api',
  headers: {
    'Content-type': 'application/json'
  }
})
