const User = require("../../models/Users");

const handlegetUser = async (req, res) => {
    try {
        // Find all users and exclude the password field
        const users = await User.find().select('-password');
        
        if (!users || users.length === 0) {
            return res.status(204).json({"message": "No users found"});
        }

        return res.json({
            users,  // Return the full array of users
            total: users.length
        });
        
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { handlegetUser };