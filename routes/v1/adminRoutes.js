const { registerAdmin } = require('../../controller/adminControllers')

const adminRouter = require('express').Router()

adminRouter.post('/signup', registerAdmin)

module.exports = adminRouter