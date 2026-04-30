const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { userRegistrationValidation, userUpdateValidation, userLoginValidation, userIdQueryValidation, userEmailParamValidation, validate } = require('../utils/validators');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', userRegistrationValidation, validate, UserController.register);
router.post('/login', userLoginValidation, validate, UserController.login);

// Protected routes (no JWT, just placeholder)
router.put('/update', authenticateToken, userUpdateValidation, validate, UserController.updateProfile);
router.get('/history', userIdQueryValidation, validate, UserController.getTransactionHistory);
router.get('/total-spent', userIdQueryValidation, validate, UserController.getTotalSpent);
router.get('/:email', authenticateToken, userEmailParamValidation, validate, UserController.getUserByEmail);

module.exports = router;