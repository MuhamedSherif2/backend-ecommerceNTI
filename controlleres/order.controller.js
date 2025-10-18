const orderModel = require('../models/order.model');

exports.createOrder = async (req, res) => {
  try {
    const order = await orderModel.create({
      user: req.user._id,
      ...req.body,
      status: 'pending'
    });
    res.status(201).json({ message: 'Order created successfully', data: order });
  } catch (error) {
    res.status(500).json({ message: 'Create order error: ' + error });
  }
};


exports.getOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === 'admin') {
      orders = await orderModel
        .find()
        .populate('user', 'name email phoneNumber')
        .sort({ createdAt: -1 });
    } else {
      orders = await orderModel
        .find({ user: req.user._id })
        .populate('user', 'name email phoneNumber')
        .sort({ createdAt: -1 });
    }

    res.status(200).json({ message: 'Orders fetched successfully', data: orders });
  } catch (error) {
    res.status(500).json({ message: 'Get orders error: ' + error });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user.role === 'user' && order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not allowed to cancel this order' });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({ message: 'Order already cancelled' });
    }

    order.status = 'cancelled';
    await order.save();

    res.status(200).json({ message: 'Order cancelled successfully', data: order });
  } catch (error) {
    res.status(500).json({ message: 'Cancel order error: ' + error });
  }
};
