const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticateUser = (req, res, next) => {
  //const header = req.headers["authorization"];

  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    console.log(token);
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "invalid token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "forbidden" });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
