const { check } = require("express-validator")
const handleValidationErrors = require('./handleValidationErrors')

const validatePostInput = [
    check('note')
        .isLength({ max: 300 })
        .withMessage('Note must be less than 300 characters'),
    check('author')
        .exists({ checkFalsy: true }),
    check('high')
        .isLength({max: 100})
        .withMessage('High must be less than 100 characters'),
    handleValidationErrors
];

module.exports = validatePostInput