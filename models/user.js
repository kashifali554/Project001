var mongoose = require ('mongoose'),
    bcrypt = require ('bcrypt');

var Schema = mongoose.Schema;
var ProductSchema = require('./product');

var UserSchema = new Schema ({
  username: String,
  passwordDigest: String,
  // TODO: Add Products to User:
  // products: [ProductSchema]
});

// create a new user with secure (hashed) password
UserSchema.statics.createSecure = function (username, password, callback) {
  var UserModel = this;

  UserModel.findOne({username: username}, function(err, existingUser){
    if(existingUser){
      callback('Username already exists', null);
    } else {

    //hash password user enters at signup
      bcrypt.genSalt(function (err, salt) {
        console.log('salt: ', salt);  //changes every time
        bcrypt.hash(password, salt, function (err, hash) {
          //create the new user, saved to db with hashed password
          console.log(hash);
          UserModel.create({
            username: username,
            passwordDigest: hash,
            }, callback);
        });
      });
    }
  });
};

//compare password user enters with hashed password ('passwordDigest')
UserSchema.methods.checkPassword = function (password) {
  //run hashing algorithm (with salt) on password user enters in order to compare with 'passwordDigest'
  return bcrypt.compareSync(password, this.passwordDigest);
};

//authenticate user (when user logs in)
UserSchema.statics.authenticate = function (username, password, callback) {
  //find user by username entered at log in
  //this refers to the User
  this.findOne({username: username}, function (err, foundUser) {
    if (!foundUser) {
      console.log('Invalid username or password');
      callback('Invalid username or password', null);
    } else if (foundUser.checkPassword(password)) {
      callback(null, foundUser);
    } else {
      console.log('Invalid username or password');
      callback('Invalid username or password', null);
    }
  });
};



var User = mongoose.model('User', UserSchema);

module.exports = User;
