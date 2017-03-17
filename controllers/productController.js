var db = require('../models');

function index (req, res) {
  db.Product.find({}, function (err, allProducts) {
    if (err) {
      console.log('All products err: ', err);
    } else {
      console.log("TOTAL PRODUCT COUNT: " , allProducts.length);
      res.json(allProducts);
    }
  });
}

function create (req, res) {
  db.Product.create(req.body, function (err, createdProduct) {
    if (err) {
      console.log('create an error: ', err);
    }
    console.log(createdProduct)
    res.json(createdProduct);
  });
}

module.exports = {
  index: index,
  create: create,
  // show: show,
  // destroy: destroy,
  // update: update
};







