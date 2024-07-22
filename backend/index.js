// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
const http = require('http');  // Import http
const socketIo = require('socket.io');  // Import socket.io

// Create server
const server = http.createServer(app);
const io = socketIo(server);  // Attach socket.io to the server

// Middleware 
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routers = require('./src/modules/router')
require('./src/config/index')
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
// Sử dụng body-parser để phân tích cú pháp application/json
app.use(bodyParser.json({ limit: '50mb' }));

// Sử dụng body-parser để phân tích cú pháp application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1',routers)


// Listen for socket connections
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
module.exports = io;