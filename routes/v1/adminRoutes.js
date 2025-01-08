const { registerAdmin, loginAdmin } = require('../../controller/adminControllers')

const adminRouter = require('express').Router()

adminRouter.post('/signup', registerAdmin)
adminRouter.post('/login', loginAdmin)

module.exports = adminRouter