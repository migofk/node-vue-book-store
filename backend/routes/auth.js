var express = require('express');
var router = express.Router();
//calling the functions from the controller
const { register,login} = require("../controllers/authController");
const {loginValidationRules,loginValidate} = require("../middlewares/validators/loginValidator");
router.post('/register',register );
router.post('/login',loginValidationRules(), loginValidate, login );



 module.exports = router;