const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { productValidator } = require('../validators/product.validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All product routes are protected
router.use(protect);

// POST /api/products (with image upload)
router.post('/', upload.single('image'), productValidator, validate, createProduct);

// GET /api/products
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProduct);

// PUT /api/products/:id (with optional image upload)
router.put('/:id', upload.single('image'), updateProduct);

// DELETE /api/products/:id
router.delete('/:id', deleteProduct);

module.exports = router;
