const productModel = require('../models/products.model');
const filterModel = require('../models/filter.model');

exports.filterProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: 'Category query is required' });
    }

    const products = await productModel
      .find({ isDeleted: false })
      .populate('category subcategory')
      .where('category')
      .equals(category);

    res.status(200).json({
      message: `Products filtered by category: ${category}`,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: `Error filtering products: ${error}` });
  }
};
