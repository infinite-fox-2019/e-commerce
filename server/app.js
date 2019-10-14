const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development' || NODE_ENV === 'test') {
    require('dotenv').config()
}

const express = require('express')