const express = require("express");
const app = express();
require("dotenv").config();
const mongooseConnect = require("./db/connection");
const { logger } = require("express-winston");
const winston = require("winston");
const path = require("path");

const env = process.env.NODE_ENV || "development";
console.log(`Running in ${env} mode`);
const logDirectory = path.join(__dirname, "logs");

const createLogger = () => {
  const logLevels = {
    development: "debug",
    staging: "warn",
    production: "error",
  };
  const fileTransportOptions = (filename, level) => ({
    filename: path.join(logDirectory, `${filename}.log`),
    level: level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  });

  const transports = [
    new winston.transports.Console({
      level: logLevels[env],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File(fileTransportOptions("error", "error")),
    new winston.transports.File(fileTransportOptions("debug", "debug")),
    new winston.transports.File(fileTransportOptions("info", "info")),
    new winston.transports.File(fileTransportOptions("warn", "warn")),
  ];

  return winston.createLogger({
    level: logLevels[env],
    transports,
    exitOnError: false,
  });
};
const loggerInstance = createLogger();
app.use(express.json());

app.use(
  logger({
    winstonInstance: loggerInstance,
    meta: false,
  })
);

app.get("/", (req, res) => {
  loggerInstance.info("get all students");
  var random_change = Math.random();
  if (random_change > 0) {
    winston.error("sutents not boud");
  }
  res.send({ message: "get all" });
});

app.get("/teacher", (req, res) => {
  loggerInstance.info("get teacher");
  res.send({ message: "teacher" });
});

app.get("/crash", (req, res) => {
  loggerInstance.error("app crashed");
  process.exit(1);
  res.send({ message: "sfsfs" });
});

app.listen(4000, async () => {
  console.log("server started at http://localhost:4000");
  await mongooseConnect();
  loggerInstance.info("app started ");
});
