const express = require("express")

const OrderController = require("../controllers/ordercontroller")

const router = express.Router();

// Public route (called from frontend after Paystack payment)
router.post('/', OrderController.createOrder);

// Paystack webhook (must be public for Paystack to access)
router.post('/webhook', OrderController.handlePaystackWebhook);

// Protected route (for order lookup)
router.get('/send-confirmation',  OrderController.getOrderDetails);

module.exports = router
