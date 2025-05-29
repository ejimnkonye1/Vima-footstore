const express = require('express');
const { handlegetUser } = require('../../controllers/admin/getusers');
const router = express.Router();
const verifyAdmin = require("../../middleware/verifyadmin");


router.get('/',verifyAdmin, handlegetUser);
module.exports = router;