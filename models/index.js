var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "mongodb://127.0.0.1/Project001" );
module.exports.Product = require('./product.js');
module.exports.User = require('./user.js');
