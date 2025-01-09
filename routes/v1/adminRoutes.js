const { registerAdmin, loginAdmin, adminProfile, logoutAdmin, checkAdmin } = require('../../controller/adminControllers')
const { adminAuth } = require('../../middleware/adminAuth')

const adminRouter = require('express').Router()

adminRouter.post('/signup', registerAdmin)
adminRouter.post('/login', loginAdmin)
adminRouter.get("/profile", adminAuth, adminProfile)
adminRouter.get("/logout",adminAuth, logoutAdmin)
adminRouter.get("/check-admin", adminAuth, checkAdmin)

module.exports = adminRouter
