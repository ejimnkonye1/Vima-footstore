const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/updateprofilecontroller');


router.put('/',  updateProfile);

module.exports = router