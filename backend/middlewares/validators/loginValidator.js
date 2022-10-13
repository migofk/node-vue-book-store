const { body,check , validationResult } = require('express-validator')
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const loginValidationRules = () => {
  return [
    body('password').not().isEmpty(),
    body('email').isEmail(),
    body('email').custom(value => {
      return User.findOne({email:value}).then(user => {
        if (!user) {
          return Promise.reject('E-mail is not registered');
        }
      });
    }),

  ]
}

const loginValidate = (req, res, next) => {
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
  loginValidationRules,
  loginValidate,
}