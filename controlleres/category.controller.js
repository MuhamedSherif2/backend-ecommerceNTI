const categoryModel = require('../models/category.model')

exports.addCategory = async (req, res) => {
    try {
        const category = await categoryModel.create(req.body)
        res.status(200).json({message:'category added successfully', data: category})
    } catch (error) {
        res.status(500).json({ message: 'Add category error: ' + error })
    }
}


exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find()
        res.status(200).json({message:'get categories successfully', data: categories})
    } catch (error) {
        res.status(500).json({ message: 'get category error: ' + error })
    }
}