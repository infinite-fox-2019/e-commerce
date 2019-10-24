'use strict'

import axiosInstance from '@/config/myaxios'
import store from '@/store'

function headers () {
  return { 'token': localStorage.getItem('token') }
}

function verifyToken (to, from, next) {
  if (localStorage.token) {
    axiosInstance.post('users/check', {}, {
      headers: headers()
    })
      .then(({ data }) => {
        Object.assign(store, data)
        next()
      }).catch((err) => {
        console.log(err)
        next('/')
      })
  } else {
    console.log('Please login first')
    next('/login')
  }
}

function verifyAdmin (to, from, next) {
  if (localStorage.token) {
    axiosInstance.post('users/check', {}, {
      headers: headers()
    })
      .then(({ data }) => {
        Object.assign(store, data)
        if (data.isAdmin === true) {
          next()
        } else {
          next('/')
        }
      }).catch((err) => {
        console.log(err)
        next('/')
      })
  } else {
    console.log('Please login first')
    next('/login')
  }
}

export default { verifyToken, verifyAdmin }
