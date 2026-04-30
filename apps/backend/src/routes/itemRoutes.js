const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item.controller');
const { itemIdValidation, itemCreationValidation, itemUpdateValidation, validate } = require('../utils/validators');

// Public routes
router.get('/', ItemController.getAllItems);
router.get('/:id', itemIdValidation, validate, ItemController.getItemById);
router.post('/', itemCreationValidation, validate, ItemController.createItem);
router.put('/:id', itemUpdateValidation, validate, ItemController.updateItem);

module.exports = router;