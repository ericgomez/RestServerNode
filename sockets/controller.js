const { Socket } = require('socket.io');
const { checkJWT } = require('../helpers');
const { ChatMessages } = require('../models');

const chatMessages = new ChatMessages();

const socketController = async (socket = new Socket(), io) => {
  const token = socket.handshake.headers['x-token']; // TODO:  get extra token
  // Check token is valid
  const user = await checkJWT(token);

  if (!user) {
    return socket.disconnect();
  }

  // Add the user connect
  chatMessages.connectUser(user);
  io.emit('active-users', chatMessages.usersArr);
  // emit last 10 message to the new client connected
  socket.emit('receive-message', chatMessages.last10);

  // Connect to specific rooms
  var id = JSON.parse(JSON.stringify(user._id)); // Parse of string mongo Id
  socket.join(id); // rooms exists: global, socket.id, user.id
  console.log(socket.rooms);

  // clean with client disconnect
  socket.on('disconnect', () => {
    chatMessages.disconnectUser(user._id);
    io.emit('active-users', chatMessages.usersArr);
  });

  // send message
  socket.on('send-message', ({ uid, message }) => {
    if (uid) {
      // message private
      socket.to(uid).emit('private-message', { of: user.name, message });
    } else {
      // message public
      chatMessages.sendMessage(user._id, user.name, message);
      // emit last 10 messages all users
      io.emit('receive-message', chatMessages.last10);
    }
  });
};

module.exports = {
  socketController,
};
