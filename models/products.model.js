const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
    isDeleted: {type: Boolean, default: false},
    isChanged: { type: Boolean, default: false },
    slug: { type: String, require: true }
}, { timestamps: true })

module.exports = mongoose.model('Products', schema)