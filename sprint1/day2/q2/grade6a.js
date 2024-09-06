const router = require("express").Router;

const fs = require("fs");

const grade6aRouter = router();

grade6aRouter.get("/", (req, res) => {
  const data = `<div>
    <h3>Grade 6A Record</h3>
    <ol>
      <li>Name List</li>
      <li>Maths Score List</li>
    </ol>
  </div>`;
  return res.send(data);
});

grade6aRouter.get("/namelist", async (req, res) => {
  const data = await fs.promises.readFile(
    "grade6AnameList.txt",
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

grade6aRouter.get("/scorelist", async (req, res) => {
  const data = await fs.promises.readFile(
    "grade6AscoreList.txt",
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

module.exports = grade6aRouter;
