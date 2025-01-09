const { checkAdmin } = require('../../controller/adminControllers')
const { loginSeller, registerSeller, sellerProfile, updateSellerProfile, checkSeller } = require('../../controller/sellerControllers')
const { sellerAuth } = require('../../middleware/sellerAuth')

const sellerRouter = require('express').Router()

sellerRouter.post('/signup', registerSeller)
sellerRouter.post('/login', loginSeller)
sellerRouter.get('/profile', sellerAuth, sellerProfile)
sellerRouter.put('/update-profile',sellerAuth,updateSellerProfile)
sellerRouter.get('/check-seller', sellerAuth, checkSeller)

module.exports = sellerRouter