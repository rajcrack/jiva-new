require("dotenv").config();
const jwt = require("jsonwebtoken");
const adminMiddleware = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      await jwt.verify(bearerToken, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          res.status(401).json({
            success: false,
            data: null,
            error: 'verif ',


          })
        }
        req.admin = data;
      });
      // req.token = bearerToken;
      next();
    } else {
      return res.status(401).json({
        success: false,
        data: null,
        error: 'Invalid token',
      });
    }
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = { adminMiddleware }