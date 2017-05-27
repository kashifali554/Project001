var db = require('../models');

function index (req, res) {
  console.log('got index');
  db.Product.find({}, function (err, allProducts) {
    if (err) {
      return console.log('All products err: ', err);
    }
      // when returning arrays in res.json, make sure to wrap them in json notation : {products: allProducts}
      res.json(allProducts);
  });
}

function create (req, res) {
  var newProduct = {
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  }

  db.Product.create(newProduct, function (err, createdProduct) {
    if (err) {
      return console.log('create an error: ', err);
    }
    res.json(createdProduct);
  });
}

function show(req, res) {
  db.Product.findOne({ _id: req.params.id }, function(error, oneProduct){
    if (error) {
      console.log('Product Controller.show error: ', error);
    }
    res.json(oneProduct);
  });
}

function destroy (req, res) {
  db.Product.findOneAndRemove({ _id: req.params.id }, function(error, oneProduct){
    if (error) {
      console.log('Product Controller.show error: ', error);
    }
    res.json(oneProduct);
  });
}

function update (req, res) {
  // var productId = req.params.id;
  // db.Product.findOneAndUpdate({_id: productId}, {$set:{req.body}}, {new: true}, function(err,req.body) {
  //   if (err) {throw err};
  //   console.log(req.body);
  //   req.body.save();
  //   res.json(req.body);
  // });
  var productId = req.params.id;
  console.log('productId:', productId);
  db.Product.findOne({_id: productId}, function (err, foundProduct) {
    if (err) {
      console.log(err, 'Product not found!');
    }
    if (req.body.image) {
      foundProduct.image = req.body.image;
    }
    if (req.body.description) {
      foundProduct.description = req.body.description;
    }
    if (req.body.price) {
      foundProduct.price = req.body.price;
    }
    foundProduct.save(function (err, savedProduct) {
      res.json(savedProduct);
    });
  });
}


module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
