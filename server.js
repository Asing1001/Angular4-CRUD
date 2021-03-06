var PORT = process.env.PORT || 3001;
var ENV = process.env.NODE_ENV || 'development';

// setup http + express + socket.io
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, { 'log level': 0 });
var path = require('path');

app.get('/envedit/:projectname', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// setup deployd
require('deployd').attach(server, {
    socketIo: io, // if not provided, attach will create one for you.
    env: ENV,
    db: { connectionString : process.env.MONGODB_URI || 'mongodb://localhost:27017/deploymentguide' }
});

// After attach, express can use server.handleRequest as middleware
app.use(server.handleRequest);

// start server
server.listen(PORT, ()=>console.log(`app listen at ${PORT}`));