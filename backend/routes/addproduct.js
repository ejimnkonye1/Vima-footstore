const express = require("express")

const router = express.Router()
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const addproductsController = require('../controllers/addproductcontroller')
const verifyAdmin = require("../middleware/verifyadmin")


router.route("/",)
      .post(verifyAdmin, upload.single('image'), addproductsController.createNewProduct);

 
module.exports = router