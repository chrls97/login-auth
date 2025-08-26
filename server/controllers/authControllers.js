import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModal.js';
import transporter from '../config/nodemailer.js';

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

    
    //Sending Welcome Email using nodemailer
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome! to Charles Dev',
      text: `Welcome to Charles Dev website, Your account has been created with email id: ${email}`
    }

    await transporter.sendMail(mailOptions);

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
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })

    return res.json({ success: true, message: "Logged Out" })

  } catch (error) {
    return res.json({ success: true, message: error.message })
  }
}

export const sendVerifyOtp = async (req, res) => {
  try{
    const {userId} = req.body;

    const user = await userModel.findById(userId);

    if(user.isAccountVerified){
      return res.json({success:false, message:"Account is already verified"});
    }

    //Generate 6 digit OTP
    const otp = String(Math.floor(100000  + Math.random() * 900000));
    //Insert OTP to database
    user.verifyOtp = otp;

    //Generate OTP Expiration for 1 day
    const otpExpDate = Date.now() + 24 * 60 * 60 * 1000;
    user.verifyOtpExpAt = otpExpDate;

    // Save to database
    await user.save();


    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to:user.email,
      subject:'Account Verification OTP',
      text:`Your OTP is ${otp}. Verify your account using this OTP.`
    }

    await transporter.sendMail(mailOptions);

    res.json({success:true, message: "Accoutn verification already sent to your email."})

  }catch(error){
    res.json({success:false, message:error.message});
  }
}

export const verifyEmail = async (req, res) => {
  const {userId, otp} = req.body;

  if(!user || !otp){
    return res.json({success:false, message:"Missing Details"})
  }

  try{

    const user = await userModel.findById({userId})

    if(!user){
      return res.json({succes:false, message:"User not found!"})
    }

    //Check/Verified OTP
    if(otp === '' || user.verifyOtp !== otp){
      return res.json({success:false , message: "Invalid OTP!"})
    }

    //Check/Verified OTP Expiration Date
    if(user.verifyOtpExpAt < Date.now()){
      return res.json({success:false, message: "OTP is expired!"})
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpAt= 0;

    await user.save();

    return res.json({success:true, message: 'Email Verified Successfully'})

  }catch(error){
    res.json({success:false, message:error.message})
  }




  //if(otp === user.verifyOtp)
}