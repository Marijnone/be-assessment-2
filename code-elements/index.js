// var sketchJs = require("sketch-js")
// var particleJs = require("./js/particle.js")
var path = require("path");
var express = require("express");
var logger = require("morgan");
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mysql = require("mysql");

app.set("views", "views");
app.set("view engine", "ejs");

// app.post('/sign-up', signup);
// Log the requests
app.use(logger("dev"));

// Serve static files
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "js")));
app.get("/account", account);
app.get("/", index);
app.get("/festivals", festivals);
app.get("/home", home);
app.get('/login',loginPage);
app.post('/login',login);
app.post('/register',signUpForm )
// NEW: Handle requests for a single book
// app.get('/books/:id', function(req, res) {
//     var bookData = {title: "the name of the book", author: "some writer"};
//     res.render('bookView.ejs', {book: bookData});
//   });
require("dotenv").config();

var connection = mysql.createConnection({
  debug:true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
connection.connect();

function account(req, res) {
  res.render("account.ejs");
}
function index(req, res) {
  res.render("index.ejs");
}
function festivals(req, res) {
  res.render("festivals.ejs");
}
function profile(req, res) {
  res.render("profile.ejs");
}
function home(req, res) {
  res.render("home.ejs");
}
function login(req,res,next){
  res.render("login.ejs");
}
//function to 
function loginPage(req,res,next){

}


// Fire it up!
app.listen(3000);
console.log("Listening on port 3000");



// Signup function + password check
function signUpForm(res,req,next) {

  var username = req.body.username ;
  var email = req.body.email ;
  var password = req.body.password ;
  var geslacht = req.body.geslacht ;
  var voorkeur1 = req.body.voorkeur1 ;
  var opzoeknaar = req.opzoeknaar ;
  var min = 8 ;
  var max = 160 ;

  if (!username || !password) {
    res.status(400).send("Username or password are missing");

    return;
  }
  if (password.length < min || password.length > max) {
    res
      .status(400)
      .send("Password must be between " + min + " and " + max + " characters");
    return;
  }
  // connection with SQL
  connection.query(
    "SELECT * FROM gebruikers WHERE username = ?",
    username,
    done
  );

  function done(err, data) {
    if (err) {
      next(err);
    } else if (data.length !== 0) {
      res.status(409).send("Username already in use");
    } else {
      argon2.hash(password).then(onhash, next);
    }
  }
  function onhash(hash) {
    connection.query(
      "INSERT INTO users SET ?",
      {
        username: username,
        email: email,
        hash: hash,
        geslacht: geslacht,
        voorkeur1: voorkeur1,
        opzoeknaar: opzoeknaar,
      },
      oninsert
    );

    function oninsert(err) {
      if (err) {
        next(err);
      } else {
        // Signed up!
        res.redirect("/festivals"); //session toevoegen om ingelogd te blijven
      }
    }
  }
}

