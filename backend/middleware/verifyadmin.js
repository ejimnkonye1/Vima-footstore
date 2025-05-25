const User = require('../models/Users');


const verifyAdmin = async (req, res, next) => {
	const { uid } = req.user;
	
	try {
		const foundUser = await User.findOne({uid});
        console.log(foundUser.email)
        console.log(foundUser.roles)
		const foundAdmin = foundUser.roles.includes("admin");
		if (!foundAdmin) return res.status(401).json({message: 'You do not have access to this route'});
		
		next()
	} catch (err) {
		console.log(err);
		res.status(500).json({message: 'Internal server error-verifyAdmin'});
	}
}


module.exports = verifyAdmin;