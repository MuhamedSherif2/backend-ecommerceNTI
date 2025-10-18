const express = require('express')
const router = express.Router()
const { authentication } = require('../middlewars/auth.middlewar')
const { auth } = require('../middlewars/authRole.middlewar')
const { addSubCategory, getSubcategories } = require('../controlleres/subcategory.controller')

router.post('/add', authentication, auth('admin', 'coreTeam'), addSubCategory)
router.get('/', getSubcategories)

module.exports = router