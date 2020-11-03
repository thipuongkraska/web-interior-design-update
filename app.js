const express= require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
////cookies and session------
const session = require("express-session");
const passport = require("passport");
///////
const env = require("./config/env");
const {id, password, url, secret} = env;
const app = express();
const Router = require("./router/Router");
const WebProduct = require("./Models/Products");

///--SETUP BASE---------------------------------
app.set("view engine", "ejs");
app.set("views", "./views");
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
//--Setup Passport------------------------------
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());

///--Connect to MongoAtlat--------------------
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.once("open", () => console.log("connected to database"));
///--ToDo Router------------------------------

app.use(Router);


app.listen(3000, ()=> console.log("server is running"));