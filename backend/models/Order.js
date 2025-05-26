const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String } // Stores URL only, not actual image files
});

const orderSchema = new mongoose.Schema({
 
  userEmail: { type: String, required: true },
  // Customer Info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  // Shipping Address
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: 'Nigeria' },
  zip: { type: String, required: true },

  // Order Items
  items: [orderItemSchema],

  // Payment Details
  paymentReference: { type: String, required: true, unique: true },
  paymentMethod: { type: String, default: 'paystack' },
  
  // Financials
  subtotal: { type: Number, required: true },
  tax: { type: Number, default: 0.075 }, // 7.5% VAT
  shipping: { type: Number, default: 0 },
  total: { type: Number, required: true },

  // Status
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);