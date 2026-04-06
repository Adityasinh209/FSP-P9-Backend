const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./src/config/db');

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const productRoutes = require('./src/routes/product.routes');
const paymentRoutes = require('./src/routes/payment.routes');

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Routes ---
app.get('/', (req, res) => {
  res.json({
    message: '🚀 FSP-P9 API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      payments: '/api/payments',
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;

// Only listen if not running on Vercel (Vercel provides its own server context)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app;
