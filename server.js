var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// TODO: should match with convention and be grouped with the above variable declarations
var session = require('express-session');

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'RomanLovesItalianPizza',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan
}));


// adds a currentUser method to the request (req) that can find the User currently logged in based on the request's `session.UserId`
app.use('/', function (req, res, next) {
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.UserId}, function (err, User) {
      if (!User) {
        callback("No User Found", null)
      } else {
        req.User = User;
        callback(null, User);
      }
    });
  };
  next();
});

var controllers = require('./controllers');

// remove all console logs from production
console.log(controllers);

// initial db require
var db = require('./models');
var User = db.User;


////////////////////
//  ROUTES
///////////////////

app.get('/login', function (req, res) {
  res.render('login', {message: ""});
});

//signup route(renders signup view)
app.get('/signup', function (req, res) {
  res.render('signup', {message: ""});
});

//create User route - creates a new User with a secure password in DB
app.post('/Users', function (req, res) {
  User.createSecure(req.body.Username, req.body.password, function (err, newUser) {
    if(err){
      // User already exists, redirect them back to signup
      res.render('signup', {message: 'Please choose another Username'});
    } else {
      // successfully created a new User, send them to home
      req.session.UserId = newUser._id;
      res.redirect('/profile');
    }
  });
});

//authenticate the User
app.post('/sessions', function (req, res) {
  User.authenticate(req.body.Username, req.body.password, function (err, User) {
    // if User not found OR password is incorrect
    if(err) {
      res.render('login', {message: 'Incorrect Username or Password'});
    }
    // else we know User and password is correct
    else if (User !== null) {
      req.session.UserId = User._id;
      res.redirect('/profile');
    }
  });
});

app.get('/home', function (req, res) {
  res.render('home');
});

app.get('/logout', function (req, res) {
  //remove the session User id
  req.session.UserId = null;
  req.User = null;
  res.redirect('/');

});
//show User profile page
app.get('/profile', function (req, res) {
  User.findOne({_id: req.session.UserId}, function (err, currentUser) {
    // handle err

    // remove all console logs from production
    console.log("Sending User: ", currentUser);

    res.render('profile.ejs', {User: currentUser});
  });
});

// root route
app.get('/', function (req, res) {
  res.sendFile('./views/landpage.html' , { root : __dirname});
});

app.get('/api', controllers.api.index);

//get all products
app.get('/api/products', controllers.product.index);

// create a product
app.post('/api/products', controllers.product.create);

// get one product
app.get('/api/products/:id', controllers.product.show);
//

//update one product
app.put('/api/products/:id', controllers.product.update);

//delete one product
app.delete('/api/products/:id', controllers.product.destroy);

////////////////////
//  SERVER LISTENER
///////////////////

app.listen(process.env.PORT || 3000, function () {
  console.log('So many fun things to do at host 3000!');
});
