var path = require("path");

var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var mysql = require("mysql");

require("dotenv").config();

var connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
  .connect();

var app = express()
  .set("views", "views")
  .set("view engine", "ejs")

  .use(logger("dev"))
  .use(express.static(path.join(__dirname, "assets")))
  .use(express.static(path.join(__dirname, "js")))
  .use(bodyParser.urlencoded({ extended: false }))

  app.get("/account", account);
  app.get("/", index);
  app.get("/festivals", festivals);
  app.get("/home", home);

  app.post("/login", login);
  app.post("/register", signUpForm)
  .listen(3000, onServerStart);

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

function login(req, res){
  res.render("login.ejs");
}

function signUpForm(req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var geslacht = req.body.geslacht;
  var voorkeur1 = req.body.voorkeur1;
  var opzoeknaar = req.opzoeknaar;
  var min = 8;
  var max = 160;

  if (!username || !password) {
    return res.status(400).send("Username or password are missing");
  }

  if (password.length < min || password.length > max) {
    return res
      .status(400)
      .send("Password must be between " + min + " and " + max + " characters");
  }

  connection.query(
    "SELECT * FROM gebruikers WHERE username = ?",
    username,
    done
  );

  function done(err, data) {
    if (err) {
      return next(err);
    }

    if (data.length !== 0) {
      return res.status(409).send("Username already in use");
    }

    return argon2
      .hash(password)
      .then(saveToDatabase)
      .catch(next);
  }

  function saveToDatabase(hash) {
    connection.query(
      "INSERT INTO gebruiker SET ?",
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
        return next(err);
      }

      return res.redirect("/festivals");
    }
  }
}

function onServerStart() {
  console.log("🌐  Server started. http://localhost:3000")
}