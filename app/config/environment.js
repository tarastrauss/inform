
var _ = require('lodash');

var localEnvVars = {
  TITLE: 'inform',
  SAFE_TITLE: 'informedVotingIsAwesome',
  SECRET_KEY: 'Foxy'

};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
