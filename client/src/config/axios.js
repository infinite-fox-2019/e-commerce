const axios = require('axios')

const token = localStorage.getItem('token')

const axiosConf = axios.create({
  baseURL: 'https://localhost:3000',
  headers: {'access_token': token}
})

module.exports = axiosConf