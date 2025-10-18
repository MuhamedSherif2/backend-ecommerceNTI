const express = require('express');
const router = express.Router();
const { filterProductsByCategory } = require('../controlleres/filter.controller');

router.get('/category', filterProductsByCategory);

module.exports = router;
