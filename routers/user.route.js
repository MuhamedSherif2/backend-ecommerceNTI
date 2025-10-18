const express = require('express')
const router = express.Router()
const { createUser, login, getAllUsers, getUserProfile, deleteUser } = require('../controlleres/user.controller')
const { authentication } = require('../middlewars/auth.middlewar')
const { auth } = require('../middlewars/authRole.middlewar')

router.post('/register', createUser)
router.post('/login', login)
router.get('/', authentication, auth('admin'), getAllUsers)
router.get('/profile',authentication, getUserProfile)
router.delete('/delete/:id', authentication, auth('admin'), deleteUser)

module.exports = router
