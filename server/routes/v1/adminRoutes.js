const { registerAdmin, loginAdmin, adminProfile, logoutAdmin, checkAdmin, updateAdminProfile, deleteAdmin, resetPassword, forgotPassword, getDashboardStats } = require('../../controller/adminControllers')
const { adminAuth } = require('../../middleware/adminAuth')

const adminRouter = require('express').Router()

adminRouter.post('/signup', registerAdmin)
adminRouter.post('/login', loginAdmin)
adminRouter.get('/profile', adminAuth, adminProfile)
adminRouter.post('/logout', adminAuth, logoutAdmin)
adminRouter.get('/check-admin', adminAuth, checkAdmin)
adminRouter.put('/update-profile', adminAuth, updateAdminProfile)
adminRouter.delete('/delete-admin/:id', adminAuth, deleteAdmin)
adminRouter.post('/forgot-password', forgotPassword);
adminRouter.post('/reset-password/:token', resetPassword);
adminRouter.get('/dashboard-stats', adminAuth, getDashboardStats);


module.exports = adminRouter
