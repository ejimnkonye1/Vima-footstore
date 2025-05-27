const express = require('express');
const { updateProduct } = require('../controllers/admin/productupdatecontroller');
const router = express.Router();


router.put('/',  updateProduct);

module.exports = router