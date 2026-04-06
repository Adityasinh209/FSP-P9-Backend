const { body } = require('express-validator');

const paymentValidator = [
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be greater than 0'),

  body('cardNumber')
    .notEmpty()
    .withMessage('Card number (last 4 digits) is required')
    .isLength({ min: 4, max: 4 })
    .withMessage('Card number must be exactly 4 digits')
    .isNumeric()
    .withMessage('Card number must contain only digits'),

  body('productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Product ID must be a valid ID'),
];

module.exports = { paymentValidator };
