const  User = require("../models/Users")

const userProfile = async (req, res) => {
  const { user } = req.params; // Extract name from params
  
  console.log(`user: ${user}`);
  
  try {
    
    const foundUser = await User.findOne({ username: user });
    console.log(foundUser)
    if (!foundUser) return res.status(404).send('User not found');

    res.status(200).json({
      email: foundUser.email,
      username: foundUser.username,
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { userProfile };
