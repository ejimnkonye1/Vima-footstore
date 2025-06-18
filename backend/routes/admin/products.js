const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const addproductsController = require('../../controllers/admin/addproductcontroller');
const { deleteProduct } = require('../../controllers/admin/deleteproductcontroller');
const { updateProduct } = require("../../controllers/admin/productupdatecontroller");
const verifyAdmin = require("../../middleware/verifyadmin");

// Corrected routes
router.post("/addproduct", verifyAdmin, upload.single('image'), addproductsController.createNewProduct);
router.delete('/deleteproduct/:name', verifyAdmin, deleteProduct);
router.put('/updateproduct', verifyAdmin, upload.none(), updateProduct);

module.exports = router;