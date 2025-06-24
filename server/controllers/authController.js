const User = require('../models/User')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/token')
const { sendOTP, verifyOTP } = require('../utils/otp')

// Admin login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(401).json({ error: 'Invalid email or password' })

    const match = await bcrypt.compare(password, admin.password)
    if (!match) return res.status(401).json({ error: 'Invalid email or password' })

    const token = generateToken(admin._id)
    res.json({ token })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
}


// Admin registration (one-time setup)
exports.registerAdmin = async (req, res) => {
  const { email, phone, password, department, role } = req.body

  if (!email || !phone || !password || !department) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const existing = await Admin.findOne({ $or: [{ email }, { phone }] })
    if (existing) {
      return res.status(409).json({ error: 'Email or phone already exists' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const admin = new Admin({
      email,
      phone,
      password: hashed,
      department,
      role: role || 'official'
    })

    await admin.save()

    const token = generateToken(admin._id)
    res.json({ token })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ error: 'Registration failed' })
  }
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
