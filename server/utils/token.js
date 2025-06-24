const jwt = require('jsonwebtoken')

exports.generateToken = (userId) => {
  const secret = process.env.JWT_SECRET
  console.log('✅ JWT_SECRET is →', secret)

  return jwt.sign({ id: userId }, secret, { expiresIn: '7d' })
}
