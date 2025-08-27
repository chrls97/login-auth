import userModel from '../models/userModal.js';

export const getUsersData = async (req, res) => {
  try{
    const {userId} = req.body;

    const user = await userModel.findById(userId);

    if(!user){
      return res.status(404).json({success:false, message:"User not found!"})
    }

    res.json({
      success:true, 
      userdata: {
        name:user.name,
        isAccountVerified:user.isAccountVerified
      }
    })
    
  }catch(error){
    res.status(500).json({success:true, message:error.message})
  }
}