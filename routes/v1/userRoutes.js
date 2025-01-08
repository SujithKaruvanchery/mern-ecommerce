const { registerUser, loginUser, userProfile, logoutUser } = require('../../controller/userControllers')
const { userAuth } = require('../../middleware/userAuth')


const userRouter = require('express').Router()

userRouter.post('/signup', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/profile', userAuth, userProfile)
userRouter.get('/logout', userAuth, logoutUser)

module.exports = userRouter
