const { registerUser, loginUser, userProfile, logoutUser, checkUser, updateUserProfile } = require('../../controller/userControllers')
const { userAuth } = require('../../middleware/userAuth')


const userRouter = require('express').Router()

userRouter.post('/signup', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/profile', userAuth, userProfile)
userRouter.get('/logout', userAuth, logoutUser)
userRouter.get('/check-user', userAuth, checkUser)
userRouter.put("/update-profile", userAuth, updateUserProfile)

module.exports = userRouter
