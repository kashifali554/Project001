var db = require('./models');

var products = [];
  products.push({
    image: 'images/samsung.jpg',
    price: 380,
    description: 'Samsung SmartTV 1080p'
  });
  products.push({
    image: 'images/hp.jpg',
    price: 270,
    description: 'HP computer PC'
  });

  db.Product.remove({}, function(err, succ){
    if(err){return console.log("REMOVE ERR: " ,err)}
    db.Product.create(products, function(err, succ){
      if(err){return console.log(err)}
        console.log("CREATED " +  succ.length + " NEW ENTRIES.");
        process.exit();
    });
  });
