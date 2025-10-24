const express = require('express');
const router = express.Router();
const { authentication } = require('../middlewars/auth.middlewar');
const { auth } = require('../middlewars/authRole.middlewar')
const { addToCart, getUserCart, removeProductFromCart, getAllCarts } = require('../controlleres/cart.controller');

router.post('/add', authentication, addToCart);
router.get('/', authentication, getUserCart);
router.get('/all', authentication, auth('admin', 'coreTeam'), getAllCarts);
router.delete('/delete/:cartId/:productId', authentication, removeProductFromCart);

module.exports = router;