const express = require("express")

const router = express.Router()
 const registercontroller = require('../controllers/registercontroller')

router.post("/", registercontroller.handleNewUser)
.get("/", (req, res) => {
    res.send("Login page")

})

module.exports = router