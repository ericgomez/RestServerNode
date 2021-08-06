const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middleware
    this.middleware();

    // Routes of application
    this.routes();
  }

  middleware() {
    // Directory public
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('Hello Word');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server listing in port', this.port);
    });
  }
}

module.exports = Server;
