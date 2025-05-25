const jwt = require("jsonwebtoken")


 const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith("Bearer")) return res.status(401).json({"message":"jwt required"});
    // console.log(authHeader) // bearer token

    const token = authHeader.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, dedcoded) => {
            if(err) return res.status(403).json({"message":"jwt exipred"})// invalid or expired
            req.user = dedcoded.UserInfo.email
            req.roles = dedcoded.UserInfo.roles
            next()
        }
    )

 }

 module.exports = verifyJWT