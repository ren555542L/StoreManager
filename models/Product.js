const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product Name is required']
  },
  productCode: {
    type: String,
    required: [true, 'Product Code is required'],
    unique: true
  },
  category: {
    type: String
  },
  supplierName: {
    type: String,
    required: [true, 'Supplier Name is required']
  },
  quantityInStock: {
    type: Number,
    min: [0, 'Quantity in Stock must be a non-negative number'],
    default: 0
  },
  reorderLevel: {
    type: Number,
    min: [1, 'Reorder Level must be greater than 0'] // Based on requirements: "Must be greater than 0" means > 0 or >=1 if integer.
  },
  unitPrice: {
    type: Number,
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: props => `Unit Price must be a positive value, got ${props.value}`
    }
  },
  manufactureDate: {
    type: Date
  },
  productType: {
    type: String,
    enum: ['Perishable', 'Non-Perishable']
  },
  status: {
    type: String,
    enum: ['Available', 'Out of Stock'],
    default: 'Available'
  }
}, { timestamps: true });

// Ensure validations run on update is handled in controller query options

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
