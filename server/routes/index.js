const Router = require('express').Router();

Router.get('/', (req, res) => res.status(200).json({ message: "Server Test Ok!" }))

module.exports = Router;