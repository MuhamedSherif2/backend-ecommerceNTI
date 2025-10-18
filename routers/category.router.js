const express = require('express')
const router = express.Router()
const {authentication} = require('../middlewars/auth.middlewar')
const {auth} = require('../middlewars/authRole.middlewar')
const {addCategory, getCategories} = require('../controlleres/category.controller')

router.post('/add',authentication, auth('admin', 'coreTeam'), addCategory)
router.get('/', getCategories)

module.exports = router