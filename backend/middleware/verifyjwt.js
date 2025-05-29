const jwt = require("jsonwebtoken");
   const verifyJWT = (req, res, next) => {
       console.log("Cookies:", req.cookies); // Log all cookies
       const authHeader = req.headers.authorization || req.headers.Authorization;
       const tokenFromCookie = req.cookies?.accessToken;

       console.log("Token from Cookie:", tokenFromCookie); // Log the cookie token
       console.log("Authorization Header:", authHeader); // Log the auth header

       // If no token found in either location
       if ((!authHeader || !authHeader.startsWith("Bearer")) && !tokenFromCookie) {
           return res.status(401).json({ "message": "JWT required" });
       }

       // Extract token (priority: Authorization header > cookie)
       const token = authHeader?.startsWith("Bearer") 
           ? authHeader.split(" ")[1] 
           : tokenFromCookie;

       console.log("Extracted Token:", token); // Log the extracted token

       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
           if (err) {
               if (err.name === "TokenExpiredError") {
                   return res.status(403).json({ "message": "JWT expired" });
               }
               return res.status(403).json({ "message": "Invalid JWT" });
           }
           
           req.user = decoded.UserInfo.email;
           req.roles = decoded.UserInfo.roles;
           next();
       });
   };
   

module.exports = verifyJWT;