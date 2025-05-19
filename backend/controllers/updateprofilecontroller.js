const  User = require("../models/Users")

const updateProfile = async (req, res) => {
	const { email, username} = req.body;
	
	
	
	const updates = {};
	if (email) updates.email = email;
	if (username) updates.username = username;

	if (Object.keys(updates).length === 0) {
		return res.status(400).send('invalid request');
	}
	
	try {
		const updatedUser = await User.findOneAndUpdate({username}, updates, {new: true});
		res.status(201).json({
			message: 'success',
			updatedUser: updatedUser
		});
		console.log(updatedUser);
		
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
}

module.exports = { updateProfile }