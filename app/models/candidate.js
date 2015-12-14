// Require mongoose to create a model.
var mongoose = require('mongoose');

// Create a schema of your model
var candidateSchema = new mongoose.Schema({
  name: String,
  affiliation: String,
  experience: String,
  dob: Date
});

// Create the model using your schema.
var Candidate = mongoose.model('Candidate', candidateSchema);

// Export the model of the Fish.
module.exports = Candidate;
