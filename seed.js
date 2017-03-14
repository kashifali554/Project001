var db = require('./models');

var products = [];
  products.push({
    title: 'Mattress',
    price: 90,
    description: 'Double high mattress with an electrical pump',
    image: 'images/mattress.jpg'
  });
  products.push({
    title: 'SmartTV',
    price: 380,
    description: 'Samsung SmartTV 1080p',
    image: 'images/samsung.jpg'
  });
  products.push({
    title: 'HP',
    price: 270,
    description: 'HP computer PC',
    image: 'images/hp.jpg'
  });
  products.push({
  title: 'Iphone',
  price: 450,
  description: 'Iphone and box',
  image: 'images/Iphone.jpg'
  });

  db.Product.remove({}, function(err, succ){
    if(err){return console.log("REMOVE ERR: " ,err)}
    db.Product.create(products, function(err, succ){
      if(err){return console.log(err)}
        console.log("CREATED " +  succ.length + " NEW ENTRIES.");
        process.exit();
    });
  });