const express = require("express");
const {
  registration,
  login,
  refreshToken,
  logout,
} = require("../controllers/authentication.controller");
const authRouter = express.authRouter();
authRouter.get("/registration", registration);

authRouter.post("/login", login);

authRouter.get("/token", refreshToken);

authRouter.delete("/logout", logout);

module.exports = authRouter;
