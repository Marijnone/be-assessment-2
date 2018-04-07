var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var mysql = require("mysql");
var argon2 = require("argon2");
var session = require("express-session");
require("dotenv").config();

var connection = mysql.createConnection({
  multipleStatements: true,
  // debug: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});
// console.log(connection) dit is een;

var app = express()
  .set("views", "views")
  .set("view engine", "ejs")

  .use(logger("dev"))
  .use(express.static(path.join(__dirname, "assets")))
  .use(express.static(path.join(__dirname, "js")))
  .use(
    bodyParser.urlencoded({
      extended: false
    })
  )
  .use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET
    })
  );

app.get("/account", account);
app.get("/", index);
app.get("/home", home);
app.get("/login", login);
app.get("/profile", profile);
app.get("/logout", logout);
app.get("/:id", profiles)

app.post("/register", signUpForm);
app.post("/log-in", inloggen);

app.listen(3000, onServerStart);

function account(req, res) {
  res.render("account.ejs");
}

function index(req, res) {
  res.render("index.ejs");
}
<<<<<<< HEAD
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function profile(req, res, next) { //to show you own profile
  var id = req.params.id
  connection.query("SELECT * FROM gebruiker WHERE username = ?", req.session.user, done)
  function done(err, data) {
=======

function profile(req, res, next) {
  getLoggedInUser(req.session.user.username, onget)

  function onget(err, user) {
>>>>>>> f284216f68305f8ccb5ca19c95f4b561d178869d
    if (err) {
      next(err);
    } else {
      res.render("profile.ejs", {
        user //adding the user to the session to show right profile
      });
<<<<<<< HEAD
      console.log(data);
=======
>>>>>>> f284216f68305f8ccb5ca19c95f4b561d178869d
    }
  }
}

function profiles(req, res, next) { //to render other profiles
  var id = req.params.id;
  connection.query("SELECT * FROM gebruiker WHERE id = ?", id, done)
  function done(err, data) {
    if (err) {
      next(err)
    } else if(data.length === 0){
      next()
    } else {
      res.render("detail.ejs", {
<<<<<<< HEAD
        data: data,
       
=======
        data,
>>>>>>> f284216f68305f8ccb5ca19c95f4b561d178869d
      });
      // console.log(data);
    }
  }
}

// function to render users
function home(req, res) {
  var id = req.params.id
  connection.query("SELECT * FROM gebruiker", done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render("home.ejs", {
        data,
        user: req.session.user
      });
    }
  }
}

function login(req, res) {
  res.render("login.ejs");
}

function logout(req,res, next) {
  req.session.destroy(function(err){
    if(err) {
      next(err)
    } else {
      res.redirect("/")
    }
  }) 
}

function inloggen(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    res.status(400).send("Username or password are missing");

    return;
  }

  getLoggedInUser(username, done);

  function done(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      argon2.verify(user.hash, password).then(onverify, next);
    } else {
      res.status(401).send("Username does not exist");
    }

    function onverify(match) {
      if (match) {
        req.session.user = {
          username: user.username
        };
        // Logged in!
        res.redirect("/home");
      } else {
        res.status(401).send("Password incorrect");
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
  var festivals = req.body.festival;
  var min = 8;
  var max = 160;
  var festivalEntries;
  console.log(req.body);

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
        festival: festivals
      },
      oninsert
    );

    function oninsert(err) {
      if (err) {
        return next(err);
      }
      req.session.user = { username: username };
      return res.redirect("/home");
    }
  }
}

function getLoggedInUser(username, cb) {
  connection.query('SELECT * FROM gebruiker WHERE username = ?', username, done)

  function done(err, user) {
    if (err) {
      cb(err, null)
    } else {
      cb(null, user[0])
    }
  }
}

function onServerStart() {
  console.log("🌐  Server started. http://localhost:3000");
}
