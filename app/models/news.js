// Require mongoose to create a model.
var mongoose = require('mongoose');

var articlesSchema = new mongoose.Schema({
  headline: String,
  author: String,
  link: String,
  date: String,
  sentiment: String
});

var newsSchema = new mongoose.Schema({
  query: String,
  searchedAt: Date,
  articles: [articlesSchema]
});

// Create the model using your schema.
var News = mongoose.model('News', newsSchema);

// Export the model of the Fish.
module.exports = News;
