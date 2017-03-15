var mongoose = require ('mongoose'),
    bcrypt = require ('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema ({
  email: String,
  passwordDigest: String
});

// create a new user with secure (hashed) password
UserSchema.statics.createSecure = function (email, password, callback) {
  var UserModel = this;
  //hash password user enters at signup
  bcrypt.genSalt(function (err, salt) {
    console.log('salt: ', salt);  //changes every time
    bcrypt.hash(password, salt, function (err, hash) {
      //create the new user, saved to db with hashed password
      console.log(hash);
      UserModel.create({
        email: email,
        passwordDigest: hash
        }, callback);
    });
  });
};

//compare password user enters with hashed password ('passwordDigest')
UserSchema.methods.checkPassword = function (password) {
  //run hashing algorithm (with salt) on password user enters in order to compare with 'passwordDigest'
  return bcrypt.compareSync(password, this.passwordDigest);
};

//authenticate user (when user logs in)
UserSchema.statics.authenticate = function (email, password, callback) {
  //find user by email entered at log in
  //this refers to the User
  this.findOne({email: email}, function (err, foundUser) {
      console.log("SUCCESS FOUNDUSER: ", foundUser);
    if (!foundUser) {
      console.log('Invalid username or password');
      callback('Invalid username or password', null);
    }
    if (foundUser.checkPassword(password)) {
      callback(null, foundUser);
    } else {
      console.log('Invalid username or password');
      callback('Invalid username or password', null);
    }
  });
};



var User = mongoose.model('User', UserSchema);

module.exports = User;


