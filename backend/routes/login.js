const express = require("express")

const router = express.Router()
 const LoginController = require("../controllers/authcontroller")
router.post("/", LoginController.handleLogin)

module.exports = router