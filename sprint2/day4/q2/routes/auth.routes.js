const express = require("express");
const { Router } = express;
const authRouter = Router();
const {
  register,
  login,
  getToken,
  logout,
} = require("../controllers/auth.controller");

authRouter.get("/", register);

authRouter.post("/", getToken);
authRouter.put("/:id", login);
authRouter.delete("/:id", logout);

module.exports = authRouter;
