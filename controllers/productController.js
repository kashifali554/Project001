var db = require('../models');

function index (req, res) {
  db.Product.find({}, function (err, allProducts) {
    if (err) {
      // console.log('All products err: ', err);
    } else {
      // console.log("TOTAL PRODUCT COUNT: " , allProducts.length);
      res.json(allProducts);
    }
  });
}

function create (req, res) {
  db.Product.create(req.body, function (err, createdProduct) {
    if (err) {
      // console.log('create an error: ', err);
    }
    console.log(createdProduct)
    res.json(createdProduct);
  });
}

function destroy(req, res) {
  // find one Product by id, delete it, and send it back as JSON
  db.Product.findOneAndRemove({ _id: req.params.id }, function(err, foundproduct){
    console.log("REMOVING");
    // note you could send just send 204, but we're sending 200 and the deleted entity
    res.json(foundproduct);
  });
}

function show(req, res) {
  //Find one product
  db.Product.find({ _id: req.params.id }, function(error, oneProduct){
      if (error) {
      console.log('Product Controller.show error: ', error);
    } 
    if(oneProduct) {
      console.log("on success response on show", oneProduct);
      res.json(oneProduct);
    }
  });
}

// // PUT or PATCH /api/Products/:ProductId
// function update(req, res) {
//   // find one Product by id, update it based on request body,
//   // and send it back as JSON
//   console.log('updating with data', req.body);
//   db.Product.find(req.params.productId, function(err, foundProduct) {
//     if(err) { console.log('ProductsController.update error', err); }
//     foundProduct.image = req.body.image;
//     foundProduct.price = req.body.price;
//     foundProduct.description = req.body.price;
//     foundProduct.save(function(err, savedProduct) {
//       if(err) { console.log('saving altered Product failed'); }
//       res.json(savedProduct);
//     });
//   });
// }

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  // update: update
};





