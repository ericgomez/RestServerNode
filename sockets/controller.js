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

  // clean with client disconnect
  socket.on('disconnect', () => {
    chatMessages.disconnectUser(user._id);
    io.emit('active-users', chatMessages.usersArr);
  });
};

module.exports = {
  socketController,
};
