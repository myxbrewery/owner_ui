var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/home.html'));
});

app.use(express.static('src/js'))
app.use(express.static('src/css'))
app.use(express.static('src/fonts'))

app.listen(8080);