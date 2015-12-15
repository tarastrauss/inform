// Require mongoose to create a model.
var mongoose = require('mongoose');
var candidateSchema = require('./candidate');



var querySchema = new mongoose.Schema({
  queryInput: String,
  postiveClick: Number,
  negativeClick: Number
});

var friendSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userId: String,
  points: Number
});

var electionSchema = new mongoose.Schema({
  race: String,
  district: String,
  date: Date,
  candidates: [candidateSchema]
});


var voteSchema = new mongoose.Schema({
  hasSearched: Boolean,
  myLocationName: String,
  myLocationStreet: String,
  myLocationCity: String,
  myLocationZip: String,
  myLocationState: String,
  elections: [electionSchema]
});


//Schema of User model
var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  facebookId: String,
  age: String,
  queries: [querySchema],
  points: Number,
  picture: String,
  friends: [friendSchema],
  voteInfo: voteSchema,
  posts: String,
  email: String
});

// Create the model using your schema.
var User = mongoose.model('User', userSchema);

// Export the model of the User.
module.exports = User;
