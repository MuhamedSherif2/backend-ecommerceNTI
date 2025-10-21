const express = require('express')
const router = express.Router()
const { authentication } = require('../middlewars/auth.middlewar')
const { auth } = require('../middlewars/authRole.middlewar')
const { addSubCategory, getSubcategories, deleteSubcategory, updateSubcategory } = require('../controlleres/subcategory.controller')

router.get('/', getSubcategories)
router.post('/add', authentication, auth('admin', 'coreTeam'), addSubCategory)
router.put('/update/:id', authentication, auth('admin', 'coreTeam'), updateSubcategory)
router.delete('/delete/:id', authentication, auth('admin'), deleteSubcategory)

module.exports = router