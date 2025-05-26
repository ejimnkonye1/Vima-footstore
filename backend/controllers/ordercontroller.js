import Order from '../models/Order.js';
import axios from 'axios';

// Verify payment with Paystack
const verifyPayment = async (reference) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );
    return response.data.data.status === 'success';
  } catch (error) {
    console.error('Paystack verification error:', error);
    return false;
  }
};

// Create order (called from frontend after Paystack payment)
export const createOrder = async (req, res) => {
  try {
    const { paymentReference, ...orderData } = req.body;
 console.log("ref", paymentReference)
 console.log("order", orderData)
    // 1. Verify payment with Paystack
    const isPaymentValid = await verifyPayment(paymentReference);
    if (!isPaymentValid) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    // 2. Recalculate totals (prevent frontend tampering)
    const subtotal = orderData.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
    const tax = subtotal * 0.075; // 7.5% VAT
    const total = subtotal + tax; // Add shipping if needed

    // 3. Create order
    const order = await Order.create({
      ...orderData,
      paymentReference,
      subtotal,
      tax,
      total,
      status: 'paid' // Only set after verification
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Paystack webhook (for extra security)
export const handlePaystackWebhook = async (req, res) => {
  const signature = req.headers['x-paystack-signature'];
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  // Validate webhook signature
  if (hash !== signature) {
    return res.sendStatus(403);
  }

  const event = req.body;
  if (event.event === 'charge.success') {
    const reference = event.data.reference;
    
    // Update order status if verification was missed
    await Order.findOneAndUpdate(
      { paymentReference: reference },
      { status: 'paid' }
    );
  }

  res.sendStatus(200);
};

// Add this new function for order lookup
export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('items.productId', 'name price');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Ensure user owns this order
    if (order.user.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};