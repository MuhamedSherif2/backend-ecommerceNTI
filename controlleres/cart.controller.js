const CartModel = require('../models/cart.model');


exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const cartItem = await CartModel.create({
            user: req.user._id,
            product: productId,
            quantity,
        });

        return res.status(201).json({ message: 'Added to cart', data: cartItem });
    } catch (err) {
        return res.status(500).json({ message: 'Add to cart error: ' + err });
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const cartItems = await CartModel.find({ user: req.user._id }).populate('product');
        return res.status(200).json({ data: cartItems });
    } catch (err) {
        return res.status(500).json({ message: 'Get cart error: ' + err });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        await CartModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Removed from cart' });
    } catch (err) {
        return res.status(500).json({ message: 'Remove error: ' + err });
    }
};