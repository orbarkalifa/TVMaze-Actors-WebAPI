import { body, validationResult } from 'express-validator';

export const validationHandler = [
  body('comment')
  .trim()
  .notEmpty()
  .withMessage('Comments can not be empty'),

  // we can attach more request bodies to validate
]

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
