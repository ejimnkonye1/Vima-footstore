const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/updateprofilecontroller');
const { updatePassword } = require('../controllers/updateprofilecontroller');



router.put('/:id',  updateProfile);
router.put('/:id/password', updatePassword);

module.exports = router