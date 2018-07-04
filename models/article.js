const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema ({
  title: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  date: {
    type: String,
    trim: true,
    required: "Date is Required"
  },
  url: {
    type: String,
    trim: true,
    required: "URL is Required"
  }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;