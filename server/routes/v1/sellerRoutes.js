const { loginSeller, registerSeller, sellerProfile, updateSellerProfile, checkSeller, logoutSeller, deleteSeller, getAllSellers, forgotPasswordSeller, resetPasswordSeller, getDashboardData, getSellerDashboardStats } = require('../../controller/sellerControllers')
const { adminAuth } = require('../../middleware/adminAuth')
const { sellerAuth } = require('../../middleware/sellerAuth')

const sellerRouter = require('express').Router()

sellerRouter.post('/signup', registerSeller)
sellerRouter.post('/login', loginSeller)
sellerRouter.get('/profile', sellerAuth, sellerProfile)
sellerRouter.put('/update-profile', sellerAuth, updateSellerProfile)
sellerRouter.get('/check-seller', sellerAuth, checkSeller)
sellerRouter.post('/logout', sellerAuth, logoutSeller)
sellerRouter.delete('/delete-seller/:id', sellerAuth, deleteSeller)
sellerRouter.get('/get-all-sellers', adminAuth, getAllSellers)
sellerRouter.post('/forgot-password', forgotPasswordSeller)
sellerRouter.post('/reset-password/:token', resetPasswordSeller)
sellerRouter.get("/dashboard",sellerAuth, getSellerDashboardStats);

module.exports = sellerRouter
