const router = require("express").Router;

const fs = require("fs");

const grade7bRouter = router();

grade7bRouter.get("/", (req, res) => {
  const data = `<div>
    <h3>Grade 7b Record</h3>
    <ol>
      <li>Name List</li>
      <li>Maths Score List</li>
    </ol>
  </div>`;
  return res.send(data);
});

grade7bRouter.get("/namelist", async (req, res) => {
  const data = await fs.promises.readFile(
    "grade7bnameList.txt",
    "utf-8",
    (err, data) => {
      if (err) {
        console.error("Error reading file", err);
      } else {
        console.log(data);
      }
    }
  );
  return res.send(JSON.stringify(data, null, 2));
});

grade7bRouter.get("/scorelist", async (req, res) => {
  const data = await fs.promises.readFile(
    "grade7bscoreList.txt",
    "utf-8",
    (err, data) => {
      if (err) {
        console.error("Error reading file", err);
      } else {
        console.log(data);
      }
    }
  );
  return res.send(data);
});

module.exports = grade7bRouter;
