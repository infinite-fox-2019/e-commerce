import axios from 'axios'

export default axios.create({
    baseURL: 'http://172.16.11.14:3000',
    timeout: 5000,
    headers: { authorization: localStorage.getItem('token') }
})