const express = require('express')
const router = express.Router()
const auth = require('../controllers/authController')

// Admin
router.post('/login', auth.adminLogin)
router.post('/register', auth.registerAdmin)

// Public
router.post('/send-otp', auth.sendOtp)
router.post('/verify-otp', auth.verifyOtp)

module.exports = router
