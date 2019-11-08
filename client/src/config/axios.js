import axios from 'axios'

const host = "https://visual-novel-api.crowfx.xyz"

export default axios.create({
    baseURL: host,
    timeout: 30000,
    headers: { Authorization: localStorage.getItem('token') }
})