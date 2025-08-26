import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOtp: { type: String, default: '' },
  verifyOtpExpAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: '' },
  resetOtpExpAt: { type: Number, default: 0 }
})

// if user models is available use the user model if not use the created userSchema
const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel