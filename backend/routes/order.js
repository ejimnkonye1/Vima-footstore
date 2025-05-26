import express from 'express';
import {
  createOrder,
  handlePaystackWebhook,
  getOrderDetails
} from '../controllers/ordercontroller.js';


const router = express.Router();

// Public route (called from frontend after Paystack payment)
router.post('/', createOrder);

// Paystack webhook (must be public for Paystack to access)
router.post('/webhook', handlePaystackWebhook);

// Protected route (for order lookup)
// router.get('/:orderId',  getOrderDetails);

export default router;
