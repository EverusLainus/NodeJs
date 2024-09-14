const mongoose = require("mongoose");

const loadModel = (modelName, schemaDefinition) => {
  const schema = new mongoose.Schema(schemaDefinition, { strict: false });
  return mongoose.model[modelName] || mongoose.model(modelName, schema);
};

module.exports = loadModel;
