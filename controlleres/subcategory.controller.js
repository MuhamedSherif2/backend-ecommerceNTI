const subCategoryModel = require('../models/subCategory.model')

exports.addSubCategory = async (req, res) => {
    try {
        const subcategory = await subCategoryModel.create(req.body)
        res.status(200).json({ message: 'Subcategory added successfully', data: subcategory })
    } catch (error) {
        res.status(500).json({ message: 'Add subcategory error: ' + error })
    }
}

exports.getSubcategories = async (req, res) => {
    try {
        const subs = await subCategoryModel.find({isDeleted: false}).populate('category', 'name')
        res.status(200).json({ message: 'Subcategories fetched', data: subs })
    } catch (error) {
        res.status(500).json({ message: 'Get subcategories error: ' + error })
    }
}


exports.updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params
        const updated = await subCategoryModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!updated) return res.status(404).json({ message: 'Subcategory not found' })
        res.status(200).json({ message: 'Subcategory updated successfully', data: updated })
    } catch (error) {
        res.status(500).json({ message: 'Update subcategory error: ' + error })
    }
}

exports.deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await subCategoryModel.findByIdAndDelete(id, { isDeleted: true }, { new: true })
        if (!deleted) return res.status(404).json({ message: 'Subcategory not found' })
        res.status(200).json({ message: 'Subcategory deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Delete subcategory error: ' + error })
    }
}
