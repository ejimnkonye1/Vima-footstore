const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
 const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized - Refresh token required" });
    }

    try {
        // Find user with the refresh token
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) {
            return res.status(403).json({ message: "Forbidden - Invalid refresh token" });
        }

        // Verify refresh token
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.email !== decoded.UserInfo.email) {
                    return res.status(403).json({ message: "Forbidden - Invalid refresh token" });
                }

                const roles = Object.values(foundUser.roles);
                
                // Generate new access token
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
                    { expiresIn: "10m" }
                );

                // Set new access token cookie
                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'None',
                    maxAge: 15 * 60 * 1000 // 15 minutes
                });

                // Return the new access token in response body
                res.json({ 
                    accessToken,
                    user: {
                        _id: foundUser._id,
                        username: foundUser.username,
                        email: foundUser.email,
                        roles: foundUser.roles
                    }
                });
            }
        );
    } catch (error) {
        console.error("Refresh token error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { handleRefreshToken };