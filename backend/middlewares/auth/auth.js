var jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = process.env;
const User = require("../../models/user");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let user = jwt.verify(token, PRIVATE_KEY);
    let userX = await User.findById(user._id).select('-password')
    req.user = userX;
    next();
  } catch (error) {
    console.log("auth error", error);
    res.status(401).json({
      message: "authentication failed",
      error: error
    });
  }
};
