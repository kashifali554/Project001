var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema ({
  image: String,
  price: Number,
  description: String
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;