const productModel = require('../models/products.model')
const fs = require('fs')
const path = require('path')

exports.createProduct = async (req, res) => {
    try {
        const addProduct = new productModel({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            subcategory: req.body.subcategory,
            img: req.file ? '/products/' + req.file.filename : null,
            slug: req.body.slug,
        })
        await addProduct.save()
        res.status(200).json({ message: 'add product successfully', data: addProduct })

    } catch (error) {
        res.status(500).json({ message: 'createProduct has error :' + error })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.find({ isDeleted: false })
        res.status(200).json({ message: 'getproduct successfully', data: products })
    } catch (error) {
        res.status(500).json({ message: 'getProducts has error :' + error })
    }
}

exports.getOneProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productModel.findOne({ slug })
            .populate('category')
            .populate('subcategory');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product found', data: product });
    } catch (error) {
        res.status(500).json({ message: 'Error in getOneProduct: ' + error });
    }
};

// exports.getRelatedProduct = async (req, res) => {
//     const id = req.params.id;
//     const products = await productModel.find({ _id: { $ne: id } })
//     res.status(200).json({ message: `get product by "${id}"`, data: products });
// };

exports.updateProduct = async (req, res) => {
    try {
        const { slug } = req.params;

        const findProduct = await productModel.findOne({ slug });
        if (!findProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updateProduct = {
            title: req.body.title || findProduct.title,
            description: req.body.description || findProduct.description,
            price: req.body.price || findProduct.price,
            category: req.body.category || findProduct.category,
            subcategory: req.body.subcategory || findProduct.subcategory,
            slug: req.body.slug || findProduct.slug,
            isChanged: true
        };

        if (req.file) {
            if (findProduct.img) {
                const oldPath = path.join('uploads', findProduct.img);
                fs.unlink(oldPath, err => {
                    if (err) console.log(`Image delete error: ${err}`);
                });
            }
            updateProduct.img = '/products/' + req.file.filename;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            findProduct._id,
            updateProduct,
            { new: true }
        );

        if (updatedProduct.isChanged === true) {
            await cartModel.deleteMany({ product: updatedProduct._id });
            console.log(`🧾 Product "${updatedProduct.title}" removed from all carts`);
        }

        res.status(200).json({
            message: 'Product updated successfully and removed from carts if changed',
            data: updatedProduct
        });

    } catch (error) {
        console.error('updateProduct error:', error);
        res.status(500).json({ message: 'updateProduct has error: ' + error });
    }
};

exports.deletedProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        const deleteProduct = await productModel.findOneAndUpdate({ slug }, { isDeleted: true }, { new: true })
        if (!deleteProduct) res.status(404).json({ message: 'product not founded' });
        res.status(200).json({ message: 'deleted product successfully' })

    } catch (error) {
        res.status(500).json({ message: 'deletedProduct has error :' + error })
    }
}