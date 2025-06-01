const  Order = require("../models/Order")
const axios = require("axios");

// Verify payment with Paystack
const verifyPayment = async (reference) => {
  console.log("Verifying payment reference:", reference);
  
  const maxRetries = 3;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
          },
          timeout: 10000 // 10 seconds timeout
        }
      );
      
      console.log("Paystack verification response:", response.data);
      
      if (response.data.status === true && response.data.data.status === 'success') {
        return true;
      }
      return false;
      
    } catch (error) {
      retryCount++;
      console.error(`Attempt ${retryCount} failed:`, error.message);
      
      if (retryCount === maxRetries) {
        console.error('Final verification error:', error);
        throw new Error(`Payment verification failed after ${maxRetries} attempts`);
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
    }
  }
};

// Create order (called from frontend after Paystack payment)
const createOrder = async (req, res) => {
  try {
    const { paymentReference, ...orderData } = req.body;
 console.log("ref", paymentReference)
 console.log("order", orderData)
    // Verify the user is authenticated
    // if (!req.userId || !req.userEmail) { // Ensure you have both ID and email
    //   return res.status(401).json({ error: 'Unauthorized - User not authenticated' });
    // }
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

      userEmail: "don@gmail.com",
      paymentReference,
      subtotal,
      tax,
      total,
      status: 'paid' // Only set after verification
    });
 console.log("order created", order)
    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Paystack webhook (for extra security)
 const handlePaystackWebhook = async (req, res) => {
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

const getOrderDetails = async (req, res) => {
 try {
    const { email } = req.params;
    console.log("useremail", email)
    const orders = await Order.find({ userEmail: email })
    
       if(!orders|| orders.length === 0) {
            return res.status(204).json({"message": "No order found"});
        }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = {
    createOrder,
    handlePaystackWebhook,
    getOrderDetails
}