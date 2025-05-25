const  User = require("../models/Users")


const bycrypt = require("bcrypt")


const handleNewUser = async (req, res) => {
    const {email, user, pwd } = req.body;

    // check if field is empty
    if (!email || !user || !pwd)
        return res.status(400).json({"message":"empty field"})
    // check for duplicate  user in db
      const emailDuplicate = await User.findOne({email: email}).exec()

     if (emailDuplicate)
        return res.status(409)
                .json({"message":"A user with this email is already registered"})
     const duplicate = await User.findOne({username: user}).exec()

     if (duplicate)
        return res.status(409)
                .json({"message":"username is already taken"})


    try {
        // enctypt password
        const hashedPwd = await bycrypt.hash(pwd, 10)
        // store new user in db
        const result = await User.create({
            "email": email,
            "username": user,
            "password": hashedPwd
        });

        console.log(result)
       
        res.status(201)
        .json({"message": `New user ${user} and ${email} created`,result})
    }catch(err){
       res.status(500).json({"message":err.message})
    }
        
}

module.exports = { handleNewUser }