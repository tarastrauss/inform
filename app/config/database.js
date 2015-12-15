var mongoose = require('mongoose');

// var env = require('./environment');

var dbUri = process.env.MONGOLAB_URI ||
            'mongodb://localhost/inform';

// connect to dbcd
mongoose.connect(dbUri);

// export the connection
module.exports = mongoose;
