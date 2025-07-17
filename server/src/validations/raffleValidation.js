const { body } = require('express-validator');

const reserveValidation = [
  body('numbers')
    .isArray({ min: 1 }).withMessage('numbers must be a non-empty array')
    .custom(arr => arr.every(Number.isInteger)).withMessage('all numbers must be integers'),

  body('name')
    .isString().withMessage('name must be a string')
    .notEmpty().withMessage('name is required'),

  body('email')
    .isEmail().withMessage('invalid email'),

  body('phone')
    .isString().withMessage('phone must be a string')
    .notEmpty().withMessage('phone is required'),
];

module.exports = {
  reserveValidation
};
