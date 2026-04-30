const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const { AppError } = require('../middleware/errorHandler');
const { userLoginValidation, validate } = require('../utils/validators');

router.post('/login', userLoginValidation, validate, async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const result = await UserService.login(email, password);

		if (!process.env.JWT_SECRET) {
			throw new AppError('JWT_SECRET is not configured', 500);
		}

		const token = jwt.sign(
			{ userId: result.user.id, email: result.user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '24h' }
		);

		res.status(200).json({
			success: true,
			message: 'Login successful',
			payload: {
				token,
				user: result.user,
			},
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
