// Main starting point of application

const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const socket = require('socket.io');

// DB Setup
mongoose.connect('mongodb://127.0.0.1:27017/CoffeeShop');

// App Setup
//app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    //res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    res.header('Access-Control-Allow-Credentials', false);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, CompanyId, OfficeId, DayId");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
    next();
});

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, '0.0.0.0', function() {
    console.log('Server listening on: ', port);
});

// socket setup
const io = socket(server);
io.set( 'origins', '*http://localhost:8080' );
//io.set( 'Credentials', 'false' );
io.on('connection', function(socket){
  console.log('a user connected');

});

//io.socket.emit('customer', '1');
router(app, io);