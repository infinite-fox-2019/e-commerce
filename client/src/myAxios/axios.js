const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://h8-server.dadepe.online'
})

module.exports = instance
