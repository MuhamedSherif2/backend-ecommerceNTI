const express = require('express')
const router = express.Router()
const { authentication } = require('../middlewars/auth.middlewar')
const { auth } = require('../middlewars/authRole.middlewar')
const { addQuestion, getAllQuestions } = require('../controlleres/faq.controller')

router.post('/add', authentication, auth('admin', 'coreTeam'), addQuestion)
router.get('/', getAllQuestions)

module.exports = router