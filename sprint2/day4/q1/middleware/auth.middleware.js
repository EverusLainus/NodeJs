const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const authHeader = req.header["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).send({ message: "invalid" });
  }
  jwt.verify(token, process.env.refresh_secret, (err, user) => {
    if (err) {
      return res.send(500).json({ message: "try again later" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
