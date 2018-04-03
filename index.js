var path = require("path");

var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var mysql = require("mysql");
var argon2 = require("argon2");
var session = require("express-session");
require("dotenv").config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  });
  // console.log(connection);
  
var app = express()
  .set("views", "views")
  .set("view engine", "ejs")

  .use(logger("dev"))
  .use(express.static(path.join(__dirname, "assets")))
  .use(express.static(path.join(__dirname, "js")))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  }))

  app.get("/account", account);
  app.get("/", index);
  app.get("/festivals", festivals);
  app.get("/home", home);
  app.get("/login", login);

  // app.post("/login", login);
  app.post("/register", signUpForm)
  app.post("/log-in",inloggen)
  app.post("/festivals", AddtoFestivalDB)

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
  connection.query("SELECT * FROM gebruiker", done)

  function done(err, data){
    if (err){
      next(err)
    }else {
      res.render('home.ejs', {data: data})  
    }
  }
}

function login(req, res){
  res.render("login.ejs");
}

function inloggen(req, res, next){
  var username = req.body.username ;
  var password = req.body.password ;

  if (!username || !password) {
    res
      .status(400)
      .send('Username or password are missing')

    return
  }

  connection.query(
    'SELECT * FROM gebruiker WHERE username = ?',
    username,
    done
  )

  function done(err, data) {
    var user = data && data[0]

    if (err) {
      next(err)
    } else if (user) {
      argon2
        .verify(user.hash, password)
        .then(onverify, next)
    } else {
      res
        .status(401)
        .send('Username does not exist')
    }

    function onverify(match) {
      if (match) {
        req.session.user = {username: user.username};
        // Logged in!
        res.redirect('/home')
      } else {
        res.status(401).send('Password incorrect')
      }
     }
    }
   }
 


function signUpForm(req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var geslacht = req.body.geslacht;
  var voorkeur1 = req.body.voorkeur1;
  var opzoeknaar = req.body.opzoek;
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
    "SELECT * FROM gebruiker WHERE username = ?",
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
      req.session.user = {username: username}
      return res.redirect("/festivals");
    }
  }
}
// WIP/////

function AddtoFestivalDB(req, res, next){
  req
  var festivals = req.body.festival
  console.log(festivals);
  for (let index = 0; index < festivals.length; index++) {
    connection.query(
      "INSERT INTO festival SET ?",
      {
        festival: req.body.festivals
        
      },
      oninsert
    );
    
  }
     
 
}

function RenderUsers(req, res, next){
 

}

function onServerStart() {
  console.log("🌐  Server started. http://localhost:3000")
}
