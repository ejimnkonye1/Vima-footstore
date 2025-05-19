const express = require('express');
const router = express.Router();
const { deleteProduct } = require('../controllers/deleteproductcontroller');

router.delete('/', deleteProduct);

module.exports = router