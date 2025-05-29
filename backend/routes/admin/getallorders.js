const express = require('express');
const { handlegetOrders } = require('../../controllers/admin/getallOrders');
const router = express.Router();
const verifyAdmin = require("../../middleware/verifyadmin");

router.get('/',verifyAdmin, handlegetOrders);
module.exports = router;