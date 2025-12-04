const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).send("No token provided");

  jwt.verify(
    token,
    process.env.JWT_SECRET || "SUPER_SECRET_KEY",
    (err, decoded) => {
      if (err) return res.status(403).send("Invalid token");

      req.userId = decoded.id;
      next();
    }
  );
};
