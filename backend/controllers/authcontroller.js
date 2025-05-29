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
    const acccessToken = jwt.sign(
        {
            "UserInfo": {          
            "email": foundUser.email,
             "roles": roles,  
        }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1d"}
    )
    const refreshToken = jwt.sign(
        {"email": foundUser.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "1d"}
    )
    foundUser.refreshToken = refreshToken
     const result = await foundUser.save()

     console.log(result)
    // while testing refresh token with thunder client remove secure true
    res.cookie("jwt", refreshToken, {httpOnly: true,sameSite:'None', secure:true,  maxAge: 24 * 60 * 60 * 1000}) // add secure true in pro
    res.json({
        "email":foundUser.email,
         "roles":foundUser.roles,
        acccessToken});
// res.json({"message":`user ${user} is logged in`})
    } else{
        res.status(401).json({"message":"invalid email and password"})
    }
  


        
}

module.exports = { handleLogin }