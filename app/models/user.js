// Require mongoose to create a model.
var mongoose = require('mongoose');
var candidateSchema = require('./candidate');

//Schema of User model
var userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  dob: Date,
  queries: [querySchema],
  points: Number,
  picture: String,
  friends: [friendSchema],
  vote_info: voteSchema,
  posts: [postSchema]
});

var querySchema = new mongoose.Schema({
  query_input: String,
  postive_click: Number,
  negative_click: Number
});

var friendSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  user_id: String,
  points: Number
});

var voteSchema = new mongoose.Schema({
  has_searched: Boolean,
  my_location_name: String,
  my_location_street: String,
  my_location_city: String,
  my_location_zip: String,
  my_location_state: String,
  elections: [electionSchema]
});

var electionSchema = new mongoose.Schema({
  race: String,
  district: String,
  date: Date,
  candidates: [candidateSchema]
});

// Create the model using your schema.
var User = mongoose.model('User', userSchema);

// Export the model of the User.
module.exports = User;
