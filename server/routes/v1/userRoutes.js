const { registerUser, loginUser, userProfile, logoutUser, checkUser, updateUserProfile, deactivateUser, activateUser, deleteUser, getAllUsers, forgotPassword, resetPassword } = require('../../controller/userControllers')
const { adminAuth } = require('../../middleware/adminAuth')
const { userAuth } = require('../../middleware/userAuth')

const userRouter = require('express').Router()

userRouter.post('/signup', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/profile', userAuth, userProfile)
userRouter.post('/logout', userAuth, logoutUser)
userRouter.get('/check-user', userAuth, checkUser)
userRouter.put('/update-profile', userAuth, updateUserProfile)
userRouter.put('/deactivate/:id', adminAuth, deactivateUser)
userRouter.put('/activate/:id', adminAuth, activateUser)
userRouter.delete('/delete-user/:id', userAuth, deleteUser)
userRouter.get('/get-all-users', adminAuth, getAllUsers)
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);

module.exports = userRouter
