const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Search product by name
router.get('/search', productController.searchProductsByName);

// Filter by category
router.get('/category', productController.filterProductsByCategory);

// Add a new product
router.post('/', productController.addProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Update product details
router.put('/:id', productController.updateProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
