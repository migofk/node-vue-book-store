const { body, validationResult } = require('express-validator')
const User = require("../../models/user");
const registerValidationRules = () => {
  return [
 
    body('first_name').not().isEmpty(),
    body('last_name').not().isEmpty(),
    body('email').isEmail(),
    body('email').custom(value => {
      return User.findOne({email:value}).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
  
    body('password').isLength({ min: 5 }),
  ]
}

const registerValidate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  registerValidationRules,
  registerValidate,
}