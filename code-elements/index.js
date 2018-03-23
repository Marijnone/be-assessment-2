var path = require('path');
var express = require('express');
var logger = require('morgan');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Log the requests
app.use(logger('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'assets'))); 

// NEW: Handle requests for a single book
app.get('/books/:id', function(req, res) {
    var bookData = {title: "the name of the book", author: "some writer"};
    res.render('bookView.ejs', {book: bookData});
  });

// Route for everything else.
app.get('*', function(req, res){
  res.send('Hello World');
});

// Fire it up!
app.listen(3000);
console.log('Listening on port 3000');  