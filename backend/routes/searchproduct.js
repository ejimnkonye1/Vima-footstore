const express = require('express');
const router = express.Router();
const { productSearch } = require('../controllers/searchproductcotroller');
// Route to get product by name
router.get('/', productSearch);
module.exports = router;