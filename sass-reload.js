var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var app = express();
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'assets/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/prefix'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/> 
}));
// Note: you must place sass-middleware *before* `express.static` or else it will 
// not work. 
app.use('/assets', express.static(path.join(__dirname, 'assets/css')));