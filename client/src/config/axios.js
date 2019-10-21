import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://35.247.174.135'
})

export default instance
