const { body } = require('express-validator');

const productValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Product name cannot exceed 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['electronics', 'clothing', 'books', 'food', 'other'])
    .withMessage('Category must be one of: electronics, clothing, books, food, other'),
];

module.exports = { productValidator };
