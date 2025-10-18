const express = require('express')
const router = express.Router()
const { authentication } = require('../middlewars/auth.middlewar')
const {auth} = require('../middlewars/authRole.middlewar')
const { createOrder, cancelOrder, getOrders } = require('../controlleres/order.controller')

router.post('/', authentication, createOrder);
router.get('/', authentication, getOrders);
router.put('/cancel/:id', authentication, cancelOrder);

module.exports = router