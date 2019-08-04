var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/home.html'));
});

app.get('/src/img/:image_path', (request, response)=>{
    let image_url = request.params.image_path;
    response.sendFile(__dirname + '/src/img/' + image_url);
});  

app.get('/lol', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/index.html'));
});

app.get('/profile', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/profile.html'));
});

app.get('/menu', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/menu.html'));
});

app.get('/subscription', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/subscription.html'));
});

app.get('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/dashboard.html'));
});

app.get('/kitchen', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/kitchen.html'));
});

app.get('/realtime', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/data/realtime.html'));
});

app.get('/periodic', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/data/periodic.html'));
});

app.get('/sales', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/data/sales.html'));
});

app.get('/customers', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/data/customers.html'));
});

app.get('/transactions', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/data/transactions.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/login.html'));
});

app.use(express.static('src/js'))
app.use(express.static('src/css'))
app.use(express.static('src/fonts'))

app.listen(8080);