var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kashman');

module.exports.Product = require('./product.js');
module.exports.User = require('./user.js');


