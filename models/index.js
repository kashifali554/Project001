var mongoose = require('mongoose');
mongoose.connect(process.env.mongodb:<lavr001>:<Fakel33$>@ds145790.mlab.com:45790/lavr001 || 'mongodb://localhost/kashman');

module.exports.Product = require('./product.js');
module.exports.User = require('./user.js');
