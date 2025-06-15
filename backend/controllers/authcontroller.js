const  User = require("../models/Users")

const bycrypt = require("bcrypt")
 const jwt = require("jsonwebtoken")
 
 
const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;

    // check if field is empty
    if (!email || !pwd)
        return res.status(400).json({"message":"empty field"})
    // check for found  users
  const foundUser =  await User.findOne({email: email}).exec()
   if(!foundUser) 
    return res.status(401).json({"message":"User not found"})

   // check match password
    const match = await bycrypt.compare(pwd, foundUser.password)

    if (match){
        const roles = Object.values(foundUser.roles)
    // crete JWT
    const accessToken = jwt.sign(
        {
            "UserInfo": { 
             "_id": foundUser._id ,           
            "email": foundUser.email,
             "username":foundUser.username,
             "roles": roles,  
        }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1d"}
    )
    console.log("Access Token Cookie Set:", accessToken);
    const refreshToken = jwt.sign(
        {"email": foundUser.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "1d"}
    )
    foundUser.refreshToken = refreshToken
    console.log("Access Token Cookie Set:", accessToken);
    console.log("next");
     const result = await foundUser.save()

     console.log(result)
    // while testing refresh token with thunder client remove secure true
  // Set access token as HTTP-only cookie (instead of sending in response body)
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true, // Enable in production
    sameSite: 'None', // Needed if frontend/backend are on different domains
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });// add secure true in pro

  
      res.json({
    _id: foundUser._id,
    user:foundUser.username,    
    email: foundUser.email,
    roles: foundUser.roles,
    phoneNumber:foundUser.phoneNumber,
    createdAt: foundUser.createdAt,
    accessToken: accessToken
  });
// res.json({"message":`user ${user} is logged in`})
    } else{
        res.status(401).json({"message":"invalid email and password"})
    }
  


        
}

module.exports = { handleLogin }