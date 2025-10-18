const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const { auth } = require('../middlewars/authRole.middlewar')
const { authentication } = require('../middlewars/auth.middlewar');

const { getProducts, getOneProduct, getRelatedProduct, createProduct, updateProduct, deletedProduct } = require('../controlleres/products.controller')

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads/products/')
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

router.get('/', getProducts)
router.get('/product/:slug', getOneProduct)
// router.get('/related/:id', getRelatedProduct)
router.post('/add', authentication, auth('admin', 'coreTeam'), upload.single('img'), createProduct)
router.put('/update/:slug', authentication, auth('admin', 'coreTeam'), upload.single('img'), updateProduct)
router.delete('/delete/:slug', authentication, auth('admin'), deletedProduct)

module.exports = router