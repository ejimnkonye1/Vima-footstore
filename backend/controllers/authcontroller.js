const  User = require("../models/Users")

const bycrypt = require("bcrypt")
 const jwt = require("jsonwebtoken")
 
 
const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;

    // Input validation
    if (!email || !pwd) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
        return res.status(401).json({ message: "Invalid credentials" }); // Generic message for security
    }

    // Verify password
    const match = await bycrypt.compare(pwd, foundUser.password);
    if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const roles = Object.values(foundUser.roles);
    
    // Create tokens
    const accessToken = jwt.sign(
        {
            UserInfo: {
                _id: foundUser._id,
                email: foundUser.email,
                username: foundUser.username,
                roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
    );

    const refreshToken = jwt.sign(
        {
            UserInfo: {
                _id: foundUser._id,
                email: foundUser.email
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    // Update refreshToken in database
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // Set HTTP-only cookies (secure storage)
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    // Response with tokens in body (for localStorage) and user data
    res.json({
        user: {
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            roles: foundUser.roles,
            phoneNumber: foundUser.phoneNumber,
            createdAt: foundUser.createdAt
        },
        tokens: {
            accessToken, // For localStorage
            refreshToken // For initial storage
        }
    });
};
module.exports = { handleLogin }