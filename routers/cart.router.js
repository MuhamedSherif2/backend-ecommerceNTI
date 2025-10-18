const express = require('express');
const router = express.Router();
const { authentication } = require('../middlewars/auth.middlewar');
const {addToCart,getUserCart,removeFromCart,} = require('../controlleres/cart.controller');

router.post('/add', authentication, addToCart);
router.get('/', authentication, getUserCart);
router.delete('/:id', authentication, removeFromCart);

module.exports = router;