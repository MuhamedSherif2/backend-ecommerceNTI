const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['range', 'category', 'subcategory'],
      required: true
    },
    options: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: function () {
        return this.type === 'category';
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Filter', filterSchema);