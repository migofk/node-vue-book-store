const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = process.env;
exports.register = async (req, res, next) => {
    try {
      //get the form data
      const { first_name, last_name, email, password } = req.body;
       //hash the password
      let encryptedPassword = await bcrypt.hash(password, 10);
      // validate the data and creating new user 
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), 
        password: encryptedPassword,
        role:'user'
      });
      // sending success message
       res.status(200).json({
        success:true,
        message: "user registered succefully",
        user:user,
      });

    } catch (error) {
      // sending error message
        console.log(error)
          res.status(400).json({
              message: "user register failed",
               error,
            });
      }
};

exports.login = async (req, res, next) => {
  try {
    //get the form data
    const {email, password } = req.body;

    //get user data by email
    let user = await User.findOne({email:email})

    //compare user password with the hashed one
    let isMatch = await bcrypt.compare(req.body.password, user.password);

    //send error message if passwords are not matched
    if (!isMatch) {
      return res.status(401).json({
        error: "incorrect email or password",
      });
    }

   //creating access token via JWT and save it in the user collection
    let token = jwt.sign({ _id: user._id, email: user.email  }, PRIVATE_KEY);
    user.token = token
    await  user.save({validateModifiedOnly: true,});
    user.password = '';

    //send the login data
      res.status(200).json({
       success:true,
       user:user
      });

  } catch (error) {
      // sending error message
      console.log(error)
        res.status(400).json({
            message: "user login failed",
            err: error,
          });
    }
};