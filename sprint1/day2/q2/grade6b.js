const router = require("express").Router;

const fs = require("fs");

const grade6bRouter = router();

grade6bRouter.get("/", (req, res) => {
  const data = `<div>
    <h3>Grade  6b Record</h3>
    <ol>
      <li>Name List</li>
      <li>Maths Score List</li>
    </ol>
  </div>`;
  return res.send(data);
});

grade6bRouter.get("/namelist", async (req, res) => {
  const data = await fs.promises.readFile(
    "grade6bnameList.txt",
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

grade6bRouter.get("/scorelist", async (req, res) => {
  const data = await fs.promises.readFile(
    "grade6bscoreList.txt",
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

module.exports = grade6bRouter;
