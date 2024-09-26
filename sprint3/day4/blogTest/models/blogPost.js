const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

blogPostModel = mongoose.model("blogPost", blogPostSchema);
module.exports = blogPostModel;
