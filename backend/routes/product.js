const express = require("express")

const router = express.Router()
 
const productsController = require('../controllers/productcontroller')



router.route("/",)
      .get(productsController.getAllProducts)


    //   router.route("/:id")
    //   .get(verifyRoles(ROLES_LIST.User,),employeeController.getEmployee)

module.exports = router