const jwt = require("jsonwebtoken");
const SERVER_JWT_SECRET = require("../index");
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  console.log("token " + token);
  try {
    const decoded = jwt.verify(token, SERVER_JWT_SECRET);
    next();
  } catch (err) {
    console.log("err: " + err);
    return res.send({ message: "unauthorized" });
  }
};

const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send({ message: "forbidden" });
  }
  next();
};

module.exports = { auth, checkRole };
