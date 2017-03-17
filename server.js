var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// mongoose.connect('mongodb://localhost/simple-login');
var controllers = require('./controllers');
console.log(controllers);

var db = require('./models');

////////////////////
//  ROUTES
///////////////////

// root route
app.get('/', function (req, res) { res.sendFile('./views/index.html' , { root : __dirname}); });

app.get('/api', controllers.api.index);

//get all products
app.get('/api/products', controllers.product.index);

// create a product
app.post('/api/products', controllers.product.create);

// //delete one product
app.delete('/api/products/:id', controllers.product.destroy);

// get one product
app.get('/api/products/:id', controllers.product.show);


// //update one product
// app.put('/api/products/:id', controllers.event.update);

////////////////////
//  SERVER LISTENER
///////////////////

app.listen(process.env.PORT || 3000, function () {
  console.log('So many fun things to do at host 3000!');
});