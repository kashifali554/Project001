var db = require('../models');

function index (req, res) {
  db.Product.find({}, function (err, allProducts) {
    if (err) {
      return console.log('All products err: ', err);
    }
      // remove all console logs from production
      console.log("TOTAL PRODUCT COUNT: " , allProducts.length);
      // when returning arrays in res.json, make sure to wrap them in json notation : {products: allProducts}
      res.json(allProducts);

  });
}

function create (req, res) {
  // Justin's personal opinion:
  var newProduct = {
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  }

  db.Product.create(newProduct, function (err, createdProduct) {
    if (err) {
      return console.log('create an error: ', err);
    }
    // remove all console logs from production
    console.log(createdProduct)
    res.json(createdProduct);
  });
}

function show(req, res) {
  //Find one product
  db.Product.findOne({ _id: req.params.id }, function(error, oneProduct){
    if (error) {
      console.log('Product Controller.show error: ', error);
    }
    // remove all console logs from production
    console.log("on success response on show", oneProduct);
    res.json(oneProduct);

  });
}

function destroy (req, res) {
  db.Product.findOneAndRemove({ _id: req.params.id }, function(error, oneProduct){
    if (error) {
      console.log('Product Controller.show error: ', error);
    }
    // remove all console logs from production
    console.log("on success response on show", oneProduct);
    res.json(oneProduct);
  });
}

function update (req, res) {
  var productId = req.params.id;
  db.Product.findOneAndUpdate({_id: productId}, updatedProduct, {new: true}, function(err,foundProduct) {
    if (err) {throw err};
    console.log(foundProduct);
    foundProduct.save();
    res.json(foundProduct);
  });
}


module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
