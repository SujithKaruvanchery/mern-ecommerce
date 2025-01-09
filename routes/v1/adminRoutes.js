const { registerAdmin, loginAdmin, adminProfile } = require('../../controller/adminControllers')
const { adminAuth } = require('../../middleware/adminAuth')

const adminRouter = require('express').Router()

adminRouter.post('/signup', registerAdmin)
adminRouter.post('/login', loginAdmin)
adminRouter.get("/profile", adminAuth, adminProfile)

module.exports = adminRouter