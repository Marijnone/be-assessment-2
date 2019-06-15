var path = require("path")
var bodyParser = require("body-parser")
var express = require("express")
var mysql = require("mysql")
var argon2 = require("argon2")
var session = require("express-session")
var multer = require("multer")
var fs = require('fs');
var PORT = process.env.PORT || 5000
require("dotenv").config()

var connection = mysql.createConnection({
  multipleStatements: true,
  // debug: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  wait_timeout:28800,
  connect_timeout:10
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

connection.on('error', function(err) {
  console.log(err.code); // 'ER_BAD_DB_ERROR'
 
});
setInterval(function () {
  connection.query('SELECT 1');
}, 5000);


var upload = multer({
  dest: 'assets/uploads/'
})

var app = express()
  .set("views", "views")
  .set("view engine", "ejs")

  // .use(logger("dev"))
  .use(express.static("static"))
  .use(express.static("assets"))
  .use(express.static("js"))
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
  )

app.get("/account", account)
app.get("/", index)
app.get("/home", home)
app.get("/login", login)
app.get("/profile", profile)
app.get("/logout", logout)
app.get("/:id", profiles)
app.get("/removeUser", removeUser)

app.post("/register", upload.single('image'), signUpForm)
app.post("/log-in", inloggen)
app.post("/updateUser", updateUser)


app.listen(PORT, onServerStart)

function account(req, res) {
  res.render("account.ejs")
}

function index(req, res) {
  res.render("index.ejs")
}

function profile(req, res, next) {
  getLoggedInUser(req.session.user.username, onget)


  function onget(err, user, ) {
    if (err) {
      next(err);
    } else {
      res.render("profile.ejs", {
        user,
        //adding the user to the session to show right profile with this
      });
    }
  }
}

function profiles(req, res, next) { //to watch other profiles
  var id = req.params.id;
  connection.query("SELECT * FROM gebruiker WHERE id = ?", id, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else if (data.length === 0) {
      next()
    } else {
      res.render("detail.ejs", {
        data
      });
    }
  }
}

// function to render users on the homepage
function home(req, res) {
  connection.query("SELECT * FROM gebruiker", done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render("home.ejs", {
        data,
        user: req.session.user
      });
    }
  }
}

function login(req, res) {
  res.render("login.ejs")
}

function logout(req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(err)
    } else {
      res.redirect("/")
    }
  })
}
//Function to log the user in and check their password
function inloggen(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    res.status(400).send("Username or password are missing")

    return;
  }

  getLoggedInUser(username, done)

  function getLoggedInUser(username, cb) {
    connection.query('SELECT * FROM gebruiker WHERE username = ?', username, done)
  //null is an empty error err if null
    function done(err, user, ) {
      if (err) {
        cb(err, null)
      } else {
        cb(null, user[0], )
      }
    }
  }


  function done(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      argon2.verify(user.hash, password).then(onverify, next)
    } else {
      res.status(401).send("Username does not exist")
    }

    function onverify(match) {
      if (match) {
        req.session.user = {
          username: user.username
        };
        // Logged in!
        res.redirect("/home");
      } else {
        res.status(401).send("Password incorrect")
      }
    }
  }
}
//signup form function user body parser to grab form input
function signUpForm(req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var geslacht = req.body.geslacht;
  var voorkeur1 = req.body.voorkeur1;
  var opzoeknaar = req.body.opzoek;
  var festivals = req.body.festival;
  var image = req.file ? req.file.filename : null;
  var min = 8;
  var max = 160;
  console.log(req.body)

  if (!username || !password) {
    return res.status(400).send("Username or password are missing")
  }

  if (password.length < min || password.length > max) {
    return res
      .status(400)
      .send("Password must be between " + min + " and " + max + " characters")
  }
  connection.query(
    "SELECT * FROM gebruiker WHERE username = ?",
    username,
    done
  )

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
      "INSERT INTO gebruiker SET ?", {
        username: username,
        email: email,
        hash: hash,
        geslacht: geslacht,
        voorkeur1: voorkeur1,
        opzoeknaar: opzoeknaar,
        festival: festivals,
      },
      oninsert
    );

    function oninsert(err, data) {
      if (err) {
        return next(err);
      } else {
        if (req.file) { //Credit to Jim van de Ven this function renames the image to the id so i can use it in data.user or user.data depends on the .render and match it to the user
          console.log("There was a file: ", req.file)
          fs.rename(req.file.path, 'assets/uploads/' + data.insertId + '.jpg', err => {
            if (err) {
              console.error(err)
            }
          })
        }
      }
    }
  }
  req.session.user = {
    username: username
  };
  return res.redirect("/home");
}


function updateUser(req, res) {
  var username = req.body.username
  var email = req.body.email
  var geslacht = req.body.geslacht
  var voorkeur1 = req.body.voorkeur1
  var opzoeknaar = req.body.opzoeknaar
//function to let a user update their profile
  connection.query('UPDATE gebruiker SET ? WHERE username = ?', [{
    username: username,
    email: email,
    geslacht: geslacht,
    voorkeur1: voorkeur1,
    opzoeknaar: opzoeknaar,
  }, username], done)

  function done(err, data) {
    console.log(data)
    if (err) {
      console.error(err)
    } else {
      profile(req, res)
    }
  }
}
//function to let a user remove their account
function removeUser(req, res) {
  var username = req.session.user.username
  connection.query('DELETE FROM gebruiker WHERE username = ?', username, done)

  function done(err, data) {
    console.log(username)
    if (err) {
      console.error(err)
    } else {
      res.redirect("/")
    }
  }
}
//this function finds the user and assign the right session to it this to show the right festival and other details on their owm profile page


function onServerStart() {
  console.log(`🌐  Server started. http://localhost:${ PORT }`);
}
