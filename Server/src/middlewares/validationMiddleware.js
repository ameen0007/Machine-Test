import { body, validationResult } from 'express-validator';

export const validateEmployee = [
    body('name').isString().isLength({ max: 30 }).withMessage('Name must be between 0 and 30 characters'),
    body('department').isString().isLength({  max: 50 }).withMessage('Department must be between 3 and 50 characters'),
    body('contact').isEmail().withMessage('Contact must be a valid email'),
    body('hiringDate').isISO8601().withMessage('Hiring date must be a valid date in ISO format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];