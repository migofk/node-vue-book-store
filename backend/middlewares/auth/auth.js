var jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = process.env;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let user = jwt.verify(token, PRIVATE_KEY);
    req.user = user;
    next();
  } catch (error) {
    console.log("auth error", error);
    res.status(401).json({
      message: "authentication failed",
      error: error
    });
  }
};
