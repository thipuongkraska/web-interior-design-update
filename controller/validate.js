const Admin = require("../Models/Admin");
const WebProduct = require("../Models/Products");
const passport = require("passport");

////route "homespace" -----------------
const getPageAdmin = async (req,res) => {
    const allData = await WebProduct.find({});
    if (req.isAuthenticated()) {
      res.render("admin",{dulieu: allData});
    } else {res.redirect("/signin")}
  };

////route "login" ---------------
const getSignin = (req,res) => {
  res.render("signin");
}

const postSignin = (req,res) => {
    console.log("here you go");
    const {username, password} = req.body;
    const currentAdmin = new Admin({
      username,
      password,
    });
    req.login(currentAdmin, (err) => {
      if (err) {
        console.log(err);
        res.send("There is something wrong");
      }
      else {
        passport.authenticate("local") (req,res, function() {
          res.redirect("/page-admin");
        });
      }
    });
  
};
/////route "register" ---------------
const getRegister = (req,res) => {
  res.render("register");
};
const postRegister = (req,res) => {
  const {username, password} = req.body;
  console.log(typeof password);
  Admin.register({username}, password,  (err) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong");
    }
    else {
      passport.authenticate("local") (req,res, function() {
        res.redirect("/page-admin");
      });
    }
  });
};
//// route LogOut -----------
const getLogout = (req,res) => {
    req.logout();
    res.redirect("/");
  };


module.exports = {
    getPageAdmin,
    getSignin,
    postSignin,
    getRegister,
    postRegister,
    getLogout,
};