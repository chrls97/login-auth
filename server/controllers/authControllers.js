import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModal.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
      return res.json({ success: false, message: "User already exsist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    //Generate Token using jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    //Generate Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 1 * 24 * 60 * 60 * 1000
    })

    return res.json({ success: true })

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Email and Password are required" })
  }

  try {

    const user = await userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({ success: false, message: "Invalid User or Password" })
    }

    //Generate Token using jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    //Generate Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 1 * 24 * 60 * 60 * 1000
    })

    return res.json({ success: true })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token',{
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })

    return res.json({success:true, message:"Logged Out"})

  } catch (error) {
    return res.json({ success: true, message: error.message })
  }
}