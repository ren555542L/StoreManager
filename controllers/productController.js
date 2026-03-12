const Product = require('../models/Product');

// Add a new product
const addProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Bad Request', details: err.message });
    }
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Bad Request', details: 'Product Code must be unique' });
    }
    next(err);
  }
};

// Get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Get product by ID
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Not Found', details: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Bad Request', details: 'Invalid Product ID format' });
    }
    next(err);
  }
};

// Update product details
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Not Found', details: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Bad Request', details: err.message });
    }
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Bad Request', details: 'Product Code must be unique' });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Bad Request', details: 'Invalid Product ID format' });
    }
    next(err);
  }
};

// Delete a product
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Not Found', details: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Bad Request', details: 'Invalid Product ID format' });
    }
    next(err);
  }
};

// Search product by name
const searchProductsByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Bad Request', details: 'Name query parameter is required' });
    }
    // Case-insensitive search
    const products = await Product.find({ productName: { $regex: name, $options: 'i' } });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Filter by category
const filterProductsByCategory = async (req, res, next) => {
  try {
    const { cat } = req.query;
    if (!cat) {
      return res.status(400).json({ error: 'Bad Request', details: 'Category (cat) query parameter is required' });
    }
    // Exact match, case-insensitive logic could be applied here if needed
    const products = await Product.find({ category: { $regex: `^${cat}$`, $options: 'i' } });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductsByName,
  filterProductsByCategory
};
