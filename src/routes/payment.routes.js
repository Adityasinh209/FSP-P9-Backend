const express = require('express');
const router = express.Router();
const { processPayment, getPaymentStatus } = require('../controllers/payment.controller');
const { paymentValidator } = require('../validators/payment.validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');

// All payment routes are protected
router.use(protect);

// POST /api/payments/pay
router.post('/pay', paymentValidator, validate, processPayment);

// GET /api/payments/:transactionId
router.get('/:transactionId', getPaymentStatus);

module.exports = router;
