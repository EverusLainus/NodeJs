const express = require("express");
const loadModel = require("../utils/modelLoader");
const router = express.Router();

router.get("/api/:collectionName", async (req, res) => {
  const { collectionName } = req.params;
  const { name, age } = req.query;
  const schemaDefinition = {
    name: String,
    age: Number,
  };

  try {
    const Model = loadModel(collectionName, schemaDefinition);
    const filter = {};
    if (name) {
      filter.name = name;
    }
    if (age) {
      filter.age = age;
    }
    const data = await Model.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
