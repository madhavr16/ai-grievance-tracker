const otps = new Map() // key: phone, value: otp

exports.sendOTP = (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000)
  otps.set(phone, otp.toString())
  console.log(`🔐 OTP for ${phone}: ${otp}`)
}

exports.verifyOTP = (phone, otp) => {
  return otps.get(phone) === otp
}
