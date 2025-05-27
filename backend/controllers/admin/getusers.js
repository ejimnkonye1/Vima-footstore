const  User = require("../../models/Users")



const handlegetUser = async (req, res) => {
 


    try {
        const users = await User.find()
     if(!users|| users.length === 0) {
            return res.status(204).json({"message": "No user found"});
        }
     const total = users.length
      
    return res.json({
        users,
        total
    })
    }catch(err){

      return res.status(500).json({ error: err.message });
    }
        
}

module.exports = { handlegetUser }