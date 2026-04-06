const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../validators/auth.validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', registerValidator, validate, register);

// POST /api/auth/login
router.post('/login', loginValidator, validate, login);

// GET /api/auth/me (protected)
router.get('/me', protect, getMe);

module.exports = router;
