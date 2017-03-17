var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

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

// adds a currentUser method to the request (req) that can find the user currently logged in based on the request's `session.userId`
app.use('/', function (req, res, next) {
  req.currentUser = function (callback) {
    user.findOne({_id: req.session.userId}, function (err, user) {
      if (!user) {
        callback("No User Found", null)
      } else {
        req.user = user;
        callback(null, user);
      }
    });
  };
  next();
});

var controllers = require('./controllers');
console.log(controllers);

var db = require('./models');

var User = require('./models/user');

var user = db.User;

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

//create user route - creates a new user with a secure password in DB
app.post('/users', function (req, res) {
  user.createSecure(req.body.username, req.body.password, function (err, newUser) {
    if(err){
      // user already exists, redirect them back to signup
      res.render('signup', {message: 'Please choose another username'});
    }
    else {
      // successfully created a new user, send them to home
      req.session.userId = newUser._id;
      res.redirect('/profile');
    }
  });
});

//authenticate the user
app.post('/sessions', function (req, res) {
  user.authenticate(req.body.username, req.body.password, function (err, user) {
    // if user not found OR password is incorrect
    if(err) {
      res.render('login', {message: 'Incorrect Username or Password'});
    }
    // else we know user and password is correct
    else if (user !== null) {
      req.session.userId = user._id;
      res.redirect('/profile');
    }
  });
});

app.get('/home', function (req, res) {
  res.render('home');
});

app.get('/logout', function (req, res) {
  //remove the session user id
  req.session.userId = null;
  req.user = null;
  res.redirect('/');

});
//show user profile page
app.get('/profile', function (req, res) {
  user.findOne({_id: req.session.userId}, function (err, currentUser) {
    console.log("Sending user: ", currentUser);
    res.render('profile.ejs', {user: currentUser});
  });
});

// root route
app.get('/', function (req, res) { res.sendFile('./views/landpage.html' , { root : __dirname}); });

app.get('/api', controllers.api.index);

//get all products
app.get('/api/products', controllers.product.index);
// get one product
// app.get('/api/products/:id', controllers.event.show);
//
// create a product
app.post('/api/products', controllers.product.create);
//
// //update one event
// app.put('/api/products/:id', controllers.event.update);
//
// //delete one event
// app.delete('/api/products/:id', controllers.event.destroy);

////////////////////
//  SERVER LISTENER
///////////////////

app.listen(process.env.PORT || 3000, function () {
  console.log('So many fun things to do at host 3000!');
});