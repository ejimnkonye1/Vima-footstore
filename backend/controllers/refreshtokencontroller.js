const  User = require("../models/Users")

const jwt = require("jsonwebtoken")
 
 
const handleRefreshToken = async (req, res) => {
   const cookies = req.cookies
   
   if(!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)

   const refreshToken = cookies.jwt

    // check for found user token
  const foundUser = await User.findOne({refreshToken}).exec()
   if(!foundUser) 
    return res.sendStatus(403)

   // evaluate jwt
   jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        if(err || foundUser.email !== decoded.email) return res.sendStatus(403);
        const roles = Object.values(foundUser.roles)
        const acccessToken = jwt.sign(
            {
                "UserInfo": {          
                "email": foundUser.email,
                 "roles": roles,  
            }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "60s"}
        )
        res.json({acccessToken})
    }
   )


        
}

module.exports = { handleRefreshToken }