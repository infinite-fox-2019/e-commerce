import axios from 'axios'

const host = 'http://192.168.0.100:3000'
// const host = 'http://localhost:3000'

export default axios.create({
    baseURL: host,
    timeout: 30000,
    headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': "multipart/form-data"
    }
})