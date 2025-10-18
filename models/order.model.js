const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
}, { timestamps: true });

module.exports = mongoose.model('orders', orderSchema);
