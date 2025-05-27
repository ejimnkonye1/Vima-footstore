const express = require('express');
const { handlegetOrders } = require('../../controllers/admin/getallOrders');
const router = express.Router();


router.get('/', handlegetOrders);
module.exports = router;