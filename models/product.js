var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema ({
  title: String,
  price: Number,
  description: String,
  img: String
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;