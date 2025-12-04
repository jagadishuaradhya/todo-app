const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // we will use this in controllers
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid Token");
  }
};
