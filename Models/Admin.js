const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


///---Create Schema and Model---------------------
const adminSchema = new mongoose.Schema({
    username : {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
    },
  });
//// add plugin of passport-local-mongoose to schema
adminSchema.plugin(passportLocalMongoose);
/////
const Admin = new mongoose.model("Admin", adminSchema);
/// setup for Collection model
passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());
passport.serializeUser(function(admin, done) {
    done(null, admin._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, admin) {
    done(err, admin);
  });
});

module.exports=Admin;