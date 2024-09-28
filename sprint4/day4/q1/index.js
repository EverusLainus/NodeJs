const express = require("express");
const app = express();
const mongooseConnect = require("./db/connection");
const { logger } = require("express-winston");
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const env = process.env.NODE_ENV || "development";
console.log(`Running in ${env} mode`);
let transports = [];

const fileRotateTransport = new DailyRotateFile({
  dirname: "./logs",
  filename: "%DATE%-error.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "10m",
  maxFiled: "14d",
  level: "info",
});

if (env === "development") {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: "debug",
    })
  );

  transports.push(fileRotateTransport);
} else if (env === "staging") {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: "info",
    })
  );

  transports.push(fileRotateTransport);
} else if (env === "production") {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: "warn",
    })
  );

  transports.push(fileRotateTransport);
}

const loggerInstance = winston.createLogger({
  format: winston.format.combine(winston.format.json()),
  transports,
});

app.use(express.json());

app.use(
  logger({
    winstonInstance: loggerInstance,
    meta: false,
  })
);

/* sir's code 
app.use(
  logger({
    transports: [new winston.transports.Console()],
    //format: format.prettyPrint(), //not good idea it make it look so big
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    meta: false,
    level: "info",
  }),
  logger({
    transports: [
      new winston.transports.File({
        filename: "error.log",
      }),
    ],
    //format: format.prettyPrint(), //not good idea it make it look so big

    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    meta: false,
    level: "error",
  })
);
*/
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
