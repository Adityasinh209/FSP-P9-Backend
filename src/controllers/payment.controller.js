// In-memory store for mock transactions
const transactions = new Map();

// @desc    Process a mock payment
// @route   POST /api/payments/pay
// @access  Private
const processPayment = async (req, res) => {
  try {
    const { amount, cardNumber, productId } = req.body;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 80% chance of success, 20% chance of failure
    const isSuccess = Math.random() < 0.8;

    const transaction = {
      transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      amount: parseFloat(amount),
      cardLast4: cardNumber,
      productId,
      userId: req.user._id,
      status: isSuccess ? 'success' : 'failed',
      message: isSuccess
        ? 'Payment processed successfully'
        : 'Payment declined — insufficient funds',
      timestamp: new Date().toISOString(),
    };

    // Store transaction for later lookup
    transactions.set(transaction.transactionId, transaction);

    const statusCode = isSuccess ? 200 : 402;

    res.status(statusCode).json({
      success: isSuccess,
      message: transaction.message,
      data: {
        transactionId: transaction.transactionId,
        amount: transaction.amount,
        cardLast4: transaction.cardLast4,
        status: transaction.status,
        timestamp: transaction.timestamp,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Payment processing error',
      error: error.message,
    });
  }
};

// @desc    Get payment status by transaction ID
// @route   GET /api/payments/:transactionId
// @access  Private
const getPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = transactions.get(transactionId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment status',
      error: error.message,
    });
  }
};

module.exports = { processPayment, getPaymentStatus };
