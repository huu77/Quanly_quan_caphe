const {Server} = require('socket.io');  // Import socket.io
const { availableParallelism } = require('node:os');
const cluster = require('node:cluster');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');
require('dotenv').config();

if (cluster.isPrimary) {
    const numCPUs = availableParallelism();
    // create one worker per available core
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork({
        PORT: 3000 + i
      });
    }
    
    // set up the adapter on the primary thread
    return setupPrimary();
  }
module.exports = (server) => {
    const io = new Server(server, {
        connectionStateRecovery: {
          maxDisconnectionDuration: 2 * 60 * 1000, // tối đa 2 phút
        },
        adapter: createAdapter()
      });  
 
  // Listen for socket connections
  io.on('connection', (socket) => {
    console.log('a user connected');
   //   joinRoom(socket);
    //   broadcast(io);
    //   leaveRoom(socket);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
};
// ví du 
// module.exports = (socket) => {
//     socket.leave('some room');
//     console.log('User left some room');
//   };
  
