const CartModel = require('../models/cart.model');
const productModel = require('../models/products.model');

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const cartItem = await CartModel.create({
            user: req.user._id,
            products: [
                {
                    product: productId,
                    quantity: quantity,
                },
            ],
        });

        return res.status(201).json({ message: '✅ Added to cart successfully', data: cartItem });
    } catch (err) {
        return res.status(500).json({ message: 'Add to cart error: ' + err });
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const cartItems = await CartModel.find({ user: req.user._id }).populate('products.product');
        return res.status(200).json({ data: cartItems });
    } catch (err) {
        return res.status(500).json({ message: 'Get cart error: ' + err });
    }
};

exports.removeProductFromCart = async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        const cart = await CartModel.findById(cartId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.products = cart.products.filter(
            (item) => item._id.toString() !== productId
        );

        await cart.save();
        res.status(200).json({ message: "Product removed", data: cart });
    } catch (error) {
        res.status(500).json({ message: `Error removing product: ${error.message}` });
    }
};

exports.getAllCarts = async (req, res) => {
    try {
        const allCarts = await CartModel.find()
            .populate('user', 'name email')
            .populate('products.product');

        return res.status(200).json({
            message: "✅ All carts fetched successfully",
            totalCarts: allCarts.length,
            data: allCarts
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error fetching all carts: ${error.message}`
        });
    }
};

