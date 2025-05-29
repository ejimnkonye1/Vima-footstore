const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const token = req.cookies.accessToken; // Access the token from cookies

    if (!token) {
        return res.status(401).json({"message": "JWT required"});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({"message": "JWT expired or invalid"}); // invalid or expired
        }
        req.user = decoded.UserInfo.email;
        req.roles = decoded.UserInfo.roles;
        next();
    });
};

module.exports = verifyJWT;
