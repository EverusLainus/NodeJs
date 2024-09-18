const { userModel } = require("../models/user.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/auth.utils");
const jwt = require("jsonwebtoken");
const refreshTokens = [];

async function registration(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.send({ message: "user already exist" });
    }
    const newUser = new userModel({ username, email, password });
    await newUser.save();
    return res.status(201).json({ message: "new user created" });
  } catch (err) {
    return res.status(500).json({ message: "new not created" });
  }
}

async function login(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user || (await userModel.comparePassword(password))) {
      return res.status(400).send({ message: "invalid credentials" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    return res.status(500).send({ message: "login successful" });
  }
}

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "invalid refresh token" });
  }
  jwt.verify(refreshToken, process.env.access_secret, (err, user) => {
    if (err) {
      return res.send(500).json({ message: "try again later" });
    }
    const accessToken = generateAccessToken(user);
    res.status(200).json({ accessToken: accessToken });
  });
};

const logout = (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((token) => token != refreshToken);
  res.status(200).json({ message: "logged out successfully" });
};
