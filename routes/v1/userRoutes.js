const { registerUser, loginUser } = require('../../controller/userControllers')


const userRouter = require('express').Router()

userRouter.post('/signup',registerUser)
userRouter.post('/login',loginUser)

module.exports = userRouter
