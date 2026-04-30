const Transaction = require('../models/transaction.model');
const Item = require('../models/item.model');
const { AppError } = require('../middleware/errorHandler');
const { redis } = require('../database/redis');

class TransactionService {
  static async createTransaction({ user_id, item_id, quantity, description }) {
    // Get item price
    const item = await Item.findById(item_id);
    if (!item) {
      throw new AppError('Item not found', 404);
    }

    // Check stock
    if (item.stock < quantity) {
      throw new AppError('Insufficient stock', 400);
    }

    const total = item.price * quantity;
    const transaction = await Transaction.create({ user_id, item_id, quantity, total, description });

    const streamId = await redis.xadd(
      'transaction-logs',
      '*',
      'userId',
      String(user_id),
      'itemId',
      String(item_id),
      'total',
      String(total)
    );

    console.log('[transaction:create]', {
      transactionId: transaction.id,
      userId: user_id,
      itemId: item_id,
      total,
      streamId,
    });

    return {
      ...transaction,
      stream_id: streamId,
    };
  }

  static async getTransactionById(id) {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }
    return transaction;
  }

  static async payTransaction(transactionId, userId) {
    if (!userId) {
      throw new AppError('User ID is required for payment', 400);
    }

    try {
      return await Transaction.pay(transactionId, userId);
    } catch (error) {
      if (error.message === 'Transaction not found or does not belong to user') {
        throw new AppError(error.message, 404);
      }
      if (error.message === 'Transaction is not pending' || error.message === 'Insufficient balance') {
        throw new AppError(error.message, 400);
      }
      throw error;
    }
  }

  static async deleteTransaction(id) {
    const transaction = await Transaction.delete(id);
    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }
    return transaction;
  }
}

module.exports = TransactionService;