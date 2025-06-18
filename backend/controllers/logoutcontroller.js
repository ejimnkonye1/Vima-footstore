const User = require("../models/Users");

const handleLogout = async (req, res) => {
    // Get refreshToken from request body instead of cookies
    const { refreshToken } = req.body;
console.log("incoming", refreshToken)
    if (!refreshToken) {
        return res.sendStatus(204); // No content (successful logout)
    }

    try {
        // Find user with this refresh token
        const foundUser = await User.findOne({ refreshToken }).exec();
        
        if (foundUser) {
            // Delete refreshToken in DB
            foundUser.refreshToken = '';
            await foundUser.save();
        }

        res.sendStatus(204); // Successful logout
    } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { handleLogout };