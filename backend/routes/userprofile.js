const express = require('express');
const router = express.Router();

const { userProfile } = require('../controllers/userProfilecontroller');

router.get('/:user', userProfile);
module.exports = router;