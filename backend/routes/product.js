const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productcontroller');

router.get("/", productsController.getAllProducts);
router.get("/men", productsController.getAllMen);
router.get("/women", productsController.getAllWomen);

module.exports = router;