const express = require('express')
const router = express.Router()
const { authentication } = require('../middlewars/auth.middlewar')
const { auth } = require('../middlewars/authRole.middlewar')
const { addTestimonial, approveTestimonial, deleteTestimonial, getApprovedTestimonials } = require('../controlleres/testimonial.controller')

router.post('/add', authentication, addTestimonial)
router.get('/', getApprovedTestimonials)
router.put('/approve/:id', authentication, auth('admin'), approveTestimonial)
router.delete('/delete/:id', authentication, auth('admin'), deleteTestimonial)

module.exports = router