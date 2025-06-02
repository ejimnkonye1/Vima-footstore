const  User = require("../models/Users")


const bycrypt = require("bcrypt")


const handleNewUser = async (req, res) => {
    const {email, username, password } = req.body;

    // check if field is empty
    if (!email || !username || !password)
        return res.status(400).json({"message":"empty field"})
    // check for duplicate  user in db
      const emailDuplicate = await User.findOne({email: email}).exec()

     if (emailDuplicate)
        return res.status(409)
                .json({"message":"A user with this email is already registered"})
     const duplicate = await User.findOne({username: username}).exec()

     if (duplicate)
        return res.status(409)
                .json({"message":"username is already taken"})


    try {
        // enctypt password
        const hashedPwd = await bycrypt.hash(password, 10)
        // store new user in db
        const result = await User.create({
            "email": email,
            "username": username,
            "password": hashedPwd
        });

        console.log(result)
       
        res.status(201)
        .json({"message": `New user ${username} and ${email} created`,result})
    }catch(err){
       res.status(500).json({"message":err.message})
    }
        
}

module.exports = { handleNewUser }