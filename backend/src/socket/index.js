const socketIo = require('socket.io');  // Import socket.io

module.exports = (server) => {
  const io = socketIo(server);  // Attach socket.io to the server

  // Listen for socket connections
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
};
