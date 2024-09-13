const express = require("express");
const app = express();
const PORT = 3000;
const connection = require("./db/index");
app.use(express.json());
app.get("/", (req, res) => {
  connection.query(`SELECT * FROM IMDB`, (err, result) => {
    if (!err) {
      return res.status(200).send(result);
    } else {
      return res.status(500).send(err);
    }
  });
});
app.post("/new", (req, res) => {
  console.log(req.body);
  const { title, rating } = req.body;
  connection.query(
    `INSERT INTO IMDB (title, rating) values( "${title}", "${rating}");`,
    (err, result) => {
      if (!err) {
        return res.status(200).send({
          message: "save new data",
        });
      } else {
        console.log("error: ", err);
        return res.status(500).send({
          message: "Error while storing data",
        });
      }
    }
  );
});

app.patch("/update/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const { title, rating } = req.body;
  const query = `UPDATE IMDB SET title = "${title}", rating = "${rating}" WHERE id = "${id}";`;

  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).send({
        message: "updated data",
      });
    } else {
      console.log("error: ", err);
      return res.status(500).send({
        message: "Error while updating data",
      });
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;

  const query = `DELETE FROM IMDB WHERE id = "${id}";`;

  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).send({
        message: "deleted data",
      });
    } else {
      console.log("error: ", err);
      return res.status(500).send({
        message: "Error while deleting data",
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
