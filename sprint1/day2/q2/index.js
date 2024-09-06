const express = require("express");
const app = express();
const grade6aRouter = require("./grade6a");
const grade6bRouter = require("./grade6b");

const grade7aRouter = require("./grade7a");
const grade7bRouter = require("./grade7b");

const grade8aRouter = require("./grade8a");
const grade8bRouter = require("./grade8b");

const PORT = 3000;

app.use(express.json());

app.use("/grade6a", grade6aRouter);

app.use("/grade6b", grade6bRouter);
app.use("/grade7a", grade7aRouter);
app.use("/grade7b", grade7bRouter);
app.use("/grade8a", grade8aRouter);
app.use("/grade8b", grade8bRouter);

app.get("/", (req, res) => {
  const data = `<div>
      <h3>Middle School Record</h3>
      <ol>
        <li>Grade: 6</li>
        <li>Grade: 7</li>
        <li>Grade: 8</li>
      </ol>
    </div>`;
  return res.send(data);
});

app.get("/grade6", (req, res) => {
  const data = `<div>
        <h3>Grade 6 Record</h3>
        <ol>
          <li>Section : A</li>
          <li>Section : B</li>
        </ol>
      </div>`;
  return res.send(data);
});

app.get("/grade7", (req, res) => {
  const data = `<div>
          <h3>Grade 7 Record</h3>
          <ol>
            <li>Section : A</li>
            <li>Section : B</li>
          </ol>
        </div>`;
  return res.send(data);
});

app.get("/grade8", (req, res) => {
  const data = `<div>
          <h3>Grade 8 Record</h3>
          <ol>
            <li>Section : A</li>
            <li>Section : B</li>
          </ol>
        </div>`;
  return res.send(data);
});
app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(PORT, () => {
  console.log(`Sever listening at port ${PORT} http://localhost:${PORT}`);
});
