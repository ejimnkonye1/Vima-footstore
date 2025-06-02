
const User = require("../models/Users");
const bcrypt = require('bcrypt');
const updateProfile = async (req, res) => {
    const { username, phoneNumber } = req.body;
    const userId = req.params.id;

    // Validate at least one field exists and is not empty
    if (!username && !phoneNumber) {
        return res.status(400).json({ message: 'At least one field must be provided' });
    }



    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...(username && { username }), // Only include if exists
                ...(phoneNumber && { phoneNumber }) // Only include if exists
            },
            { new: true, runValidators: true } // Return updated doc and run schema validations
        );
		console.log(updatedUser)

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                username: updatedUser.username,
                phoneNumber: updatedUser.phoneNumber
            }
        });

    } catch (err) {
        console.error('Update error:', err);
        return res.status(500).json({ 
            message: 'Failed to update profile',
            error: err.message 
        });
    }
};

const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Current password and new password are required' });
    }

    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        res.status(200).json({
            message: 'Password updated successfully',
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email
               
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { updateProfile, updatePassword };


