var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kashman');

module.exports.Product = require('./product.js');


