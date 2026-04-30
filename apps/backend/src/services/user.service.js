const User = require('../models/user.model');
const { AppError } = require('../middleware/errorHandler');
const bcrypt = require('bcrypt');
const { redis, getUserCacheKey } = require('../database/redis');

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

class UserService {
  static async register({ name, username, email, phone, password }) {
    // Check if user already exists by email
    const existingUserByEmail = await User.findByEmail(email);
    if (existingUserByEmail) {
      throw new AppError('User with this email already exists', 400);
    }
    // Note: username uniqueness is enforced by database constraint

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    });

    return user;
  }

  static async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    if (typeof user.password !== 'string' || !user.password.startsWith('$2')) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    return { user: { id: user.id, name: user.name, username: user.username, email: user.email, phone: user.phone, balance: user.balance } };
  }

  static async updateProfile(id, updateData) {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new AppError('User not found', 404);
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
    }

    const updatedUser = await User.update(id, updateData);
    if (!updatedUser) {
      throw new AppError('User not found', 404);
    }

    // invalidasi cache user berdasarkan email lama dan email terbaru
    const keysToDelete = new Set();
    if (existingUser.email) keysToDelete.add(getUserCacheKey(existingUser.email));
    if (updatedUser.email) keysToDelete.add(getUserCacheKey(updatedUser.email));
    if (keysToDelete.size > 0) {
      await redis.del(...Array.from(keysToDelete));
    }

    return updatedUser;
  }

  static async getTransactionHistory(userId) {
    return User.getTransactionHistory(userId);
  }

  static async getTotalSpent(userId) {
    return User.getTotalSpent(userId);
  }
  
  static async getUserByEmail(email) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      balance: user.balance,
      created_at: user.created_at,
    };
  }


}

module.exports = UserService;