const User = require('../models/User')
const jwt = require("jsonwebtoken");

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"});
}
// controllers/authController.js
 
 const registerUser= async (req, res) => {
   console.log("Received body:", req.body);
const { fullName, email, password } = req.body;


if(!fullName || !email || !password){
  return res.status(400).json({message: "All fields are required"});
}

try{
  const existingUser = await User.findOne({email});
  if (existingUser){
    return res.status(400).json({message:"email already in use"});
  }
  const user = await User.create({
    fullName,
    email,
    password,
    // profileImageUrl,
  });

  res.status(201).json({
    id: user._id,
    user,
    token: generateToken(user._id),
  });
}
catch(err){
  res
    .status(500)
    .json({message: "Error registering user",
      error:err.message,
    });
}

};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    // Make sure user exists and password matches
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Send success response with token
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });

  } catch (err) {
    res.status(500).json({
      message: "Error logging in user", 
      error: err.message,
    });
  }
};

const getUserInfo = async (req, res) => {
// const {fullName,email,password,profileImage}
try{
  const user = await User.findById(req.user.id).select("-password");
  if(!user){
    return res.status(404).json({message:"User not Found"});
  }
  res.status(200).json(user);

}
catch(err){
     res.status(500).json({
      message: "Error logging in user", 
      error: err.message,
    });
}
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
};
