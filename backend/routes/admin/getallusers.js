const express = require('express');
const { handlegetUser } = require('../../controllers/admin/getusers');
const router = express.Router();


router.get('/', handlegetUser);
module.exports = router;