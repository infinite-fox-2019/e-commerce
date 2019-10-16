import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 30000,
    headers: { Authorization: localStorage.getItem('token') }
})