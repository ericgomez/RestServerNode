const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = '/api/users';

    // Middleware
    this.middleware();

    // Routes of application
    this.routes();
  }

  middleware() {
    // cors
    this.app.use(cors());

    // Parser and read body
    this.app.use(express.json());

    // Directory public
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.userPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server listing in port', this.port);
    });
  }
}

module.exports = Server;
