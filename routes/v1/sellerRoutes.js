const { registerUser } = require('../../controller/userControllers')

const sellerRouter = require('express').Router()

sellerRouter.post('/signup', registerUser)

module.exports = sellerRouter