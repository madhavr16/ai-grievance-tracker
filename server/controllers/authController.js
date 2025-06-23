const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/token')
const { sendOTP, verifyOTP } = require('../utils/otp')

// Admin login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email, role: 'admin' })
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = generateToken(user._id)
  res.json({ token })
}

// Admin registration (one-time setup)
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body
  const passwordHash = bcrypt.hashSync(password, 10)
  const user = new User({ role: 'admin', email, passwordHash })
  await user.save()
  res.json({ message: 'Admin created' })
}

// Public: Send OTP
exports.sendOtp = async (req, res) => {
  const { phone } = req.body
  sendOTP(phone)
  res.json({ message: 'OTP sent' })
}

// Public: Verify OTP & login/register
exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body
  if (!verifyOTP(phone, otp)) {
    return res.status(401).json({ error: 'Invalid OTP' })
  }

  let user = await User.findOne({ phone })
  if (!user) {
    user = await User.create({ phone, role: 'public' })
  }

  const token = generateToken(user._id)
  res.json({ token })
}
