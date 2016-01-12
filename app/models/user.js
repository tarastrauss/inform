// Require mongoose to create a model.
var mongoose = require('mongoose');

mongoose.Promise = Promise;

var querySchema = new mongoose.Schema({
  queryInput: String,
  negativeClick: Number,
  positiveClick: Number,
  neutralClick: Number
});

var friendSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userId: String,
  points: Number
});

var candidateSchema = new mongoose.Schema({
  race: String,
  clickedCandidates: [String],
  clickedDem: Boolean,
  clickedRep: Boolean,
  clickedIn: Boolean
});


var voteSchema = new mongoose.Schema({
  hasSearched: Boolean,
  myLocationName: String,
  myLocationStreet: String,
  myLocationCity: String,
  myLocationZip: String,
  myLocationState: String,
  myVoteUrl: String,
  elections: [mongoose.Schema.Types.Mixed],
  researchedCandidates: [candidateSchema]
});


//Schema of User model
var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  queries: [querySchema],
  points: Number,
  picture: String,
  friends: [friendSchema],
  voteInfo: voteSchema,
  posts: String,
  email: String,
  address: String
});

// add bcrypt hashing to model (works on a password field)!
userSchema.plugin(require('mongoose-bcrypt'));

// Create the model using your schema.
var User = mongoose.model('User', userSchema);

// Export the model of the User.
module.exports = User;
