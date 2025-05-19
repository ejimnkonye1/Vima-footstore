const express = require('express');
const router = express.Router();
const { productDetails } = require('../controllers/productdetailscontroller');
// Route to get product by name
router.get('/:name', productDetails);
module.exports = router;