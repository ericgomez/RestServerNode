const { Socket } = require('socket.io');
const { checkJWT } = require('../helpers');

const socketController = async (socket = new Socket()) => {
  const token = socket.handshake.headers['x-token']; // TODO:  get extra token
  // Check token is valid
  const user = await checkJWT(token);

  if (!user) {
    return socket.disconnect();
  }

  console.log(user.name, 'connected');
};

module.exports = {
  socketController,
};
