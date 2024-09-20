const express = require("express");
const passport = require("passport");
const configurePassport = require("./config/passwordConfig");
const productsRouter = require("./routes/products.routes");
const mongoDbConnect = require("./db/connection");
const authRouter = require("./routes/auth.routes");
const app = express();

app.use(express.json());
mongoDbConnect();

app.use(
  session({
    secret: "mysecteds",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);
app.use("/products", productsRouter);
app.use("./auth", authRouter);

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
