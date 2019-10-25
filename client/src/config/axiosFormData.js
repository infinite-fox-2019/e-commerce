import axios from 'axios'

const host = process.env.VUE_APP_HOST_URL


export default axios.create({
    baseURL: host,
    timeout: 30000,
    headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': "multipart/form-data"
    }
})