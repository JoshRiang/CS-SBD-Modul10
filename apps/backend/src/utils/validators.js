const { body, param, query } = require('express-validator');

// Regex patterns
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;
const usernameRegex = /^[A-Za-z0-9_]{3,20}$/;
const phoneRegex = /^\+?[0-9\s-]+$/;

// Validation rules
const userRegistrationValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters'),
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
    .matches(usernameRegex).withMessage('Username can only contain letters, numbers, and underscore'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .matches(emailRegex).withMessage('Email format is invalid'),
  body('phone')
    .optional()
    .trim()
    .matches(phoneRegex).withMessage('Phone must use international format (+ optional, digits, spaces, or dashes only)'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .matches(passwordRegex).withMessage('Password must be at least 10 characters and include uppercase, lowercase, number, and special character'),
];

const userUpdateValidation = [
  body('id')
    .isInt({ min: 1 }).withMessage('User ID must be a positive integer'),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters'),
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
    .matches(usernameRegex).withMessage('Username can only contain letters, numbers, and underscore'),
  body('email')
    .optional()
    .trim()
    .matches(emailRegex).withMessage('Email format is invalid'),
  body('phone')
    .optional()
    .trim()
    .matches(phoneRegex).withMessage('Phone must use international format (+ optional, digits, spaces, or dashes only)'),
  body('password')
    .optional()
    .trim()
    .matches(passwordRegex).withMessage('Password must be at least 10 characters and include uppercase, lowercase, number, and special character'),
  body('balance')
    .optional()
    .isInt({ min: 0 }).withMessage('Balance must be a non-negative integer'),
];

const userLoginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .matches(emailRegex).withMessage('Email format is invalid'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .matches(passwordRegex).withMessage('Password must be at least 10 characters and include uppercase, lowercase, number, and special character'),
];

const transactionCreationValidation = [
  body('user_id')
    .isInt({ min: 1 }).withMessage('User ID must be a positive integer'),
  body('item_id')
    .isInt({ min: 1 }).withMessage('Item ID must be a positive integer'),
  body('quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description must be at most 500 characters'),
];

const transactionIdValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Transaction ID must be a positive integer'),
];

const itemIdValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Item ID must be a positive integer'),
];

const itemCreationValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Item name is required')
    .isLength({ max: 200 }).withMessage('Item name must be at most 200 characters'),
  body('price')
    .isInt({ min: 0 }).withMessage('Price must be a non-negative integer'),
  body('stock')
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

const itemUpdateValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Item ID must be a positive integer'),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Item name must be at most 200 characters'),
  body('price')
    .optional()
    .isInt({ min: 0 }).withMessage('Price must be a non-negative integer'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

const userIdQueryValidation = [
  query('user_id')
    .optional()
    .isInt({ min: 1 }).withMessage('user_id query must be a positive integer'),
];

const userEmailParamValidation = [
  param('email')
    .trim()
    .notEmpty().withMessage('Email param is required')
    .matches(emailRegex).withMessage('Email param format is invalid'),
];

const validate = (req, res, next) => {
  const errors = require('express-validator').validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg);
    return res.status(400).json({
      success: false,
      message: messages.join('. '),
      payload: null,
    });
  }
  next();
};

module.exports = {
  emailRegex,
  passwordRegex,
  usernameRegex,
  phoneRegex,
  userRegistrationValidation,
  userUpdateValidation,
  userLoginValidation,
  transactionCreationValidation,
  transactionIdValidation,
  itemIdValidation,
  itemCreationValidation,
  itemUpdateValidation,
  userIdQueryValidation,
  userEmailParamValidation,
  validate,
};