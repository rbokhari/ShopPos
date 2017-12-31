// Main starting point of application

const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const socket = require('socket.io');

const router = require('./router');
const config = require('./config');

// DB Setup
mongoose.Promise = global.Promise;
//mongoose.connect(config.mongoDBAddress, { useMongoClient: true });    //setting in config file
mongoose.connection.openUri(config.mongoDBAddress);

// App Setup
//app.use(morgan('combined'));
app.use(cors());
//app.use(express.static('excel'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    //res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    res.header('Access-Control-Allow-Credentials', false);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, CompanyId, OfficeId, DayId");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");

    //console.log("GOT REQUEST !", req.url);
    next();
});

// Server Setup
const port = process.env.PORT || config.serverListeningPort;
const server = http.createServer(app);
server.listen(port, '0.0.0.0', function() {
    console.log('Server listening on: ', port);
});

// socket setup
const io = socket(server);
io.set( 'origins', config.socketIOAddress );    // setting in config file
//io.set( 'Credentials', 'false' );
io.on('connection', function(socket){
  console.log('a user connected');
});
//io.socket.emit('customer', '1');

router(app, io);