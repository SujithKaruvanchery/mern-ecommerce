const { registerUser, loginUser, userProfile } = require('../../controller/userControllers')
const { userAuth } = require('../../middleware/userAuth')


const userRouter = require('express').Router()

userRouter.post('/signup',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/profile',userAuth,userProfile)

module.exports = userRouter
