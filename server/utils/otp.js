const otps = new Map() // key: phone, value: { otp, expiresAt }

exports.sendOTP = (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + 5 * 60 * 1000 // 5 min from now
  otps.set(phone, { otp, expiresAt })
  console.log(`🔐 OTP for ${phone}: ${otp}`)
}

exports.verifyOTP = (phone, otp) => {
  const record = otps.get(phone)
  if (!record) return false
  const { otp: savedOtp, expiresAt } = record
  const isValid = savedOtp === otp && Date.now() <= expiresAt
  if (isValid) otps.delete(phone) // OTP should be one-time use
  return isValid
}
