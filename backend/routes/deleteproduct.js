const express = require('express');
const router = express.Router();
const { deleteProduct } = require('../controllers/admin/deleteproductcontroller');

router.delete('/:name', deleteProduct);

module.exports = router