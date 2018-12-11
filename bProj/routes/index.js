// routes/index.js
var express = require('express');
var app = express();

app.get('/', function (request, response) {
    // render the views/index.ejs template file
    response.render('index.ejs', {title: ''})
});

module.exports = app;