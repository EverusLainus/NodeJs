const router = require("express").Router;

const fs = require("fs");

const grade8aRouter = router();

grade8aRouter.get("/", (req, res) => {
  const data = `<div>
    <h3>Grade 8a Record</h3>
    <ol>
      <li>Name List</li>
      <li>Maths Score List</li>
    </ol>
  </div>`;
  return res.send(data);
});

grade8aRouter.get("/namelist", async (req, res) => {
  const data = await fs.promises.readFile(
    "grade8anameList.txt",
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

grade8aRouter.get("/scorelist", async (req, res) => {
  const data = await fs.promises.readFile(
    "grade8ascoreList.txt",
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

module.exports = grade8aRouter;
