const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    isApproved: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('testimonials', schema)
