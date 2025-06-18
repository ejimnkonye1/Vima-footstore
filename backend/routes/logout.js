
const express = require("express")

const router = express.Router()
 const handleLogoutController = require('../controllers/logoutcontroller')
router.post('/', handleLogoutController.handleLogout);
module.exports = router