const express = require('express');
const cors = require('cors');

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
    // cors
    this.app.use(cors());
    // Directory public
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.json({
        msg: 'get API',
      });
    });

    this.app.post('/api', (req, res) => {
      res.status(201).json({
        msg: 'post API',
      });
    });

    this.app.put('/api', (req, res) => {
      res.json({
        msg: 'put API',
      });
    });

    this.app.delete('/api', (req, res) => {
      res.json({
        msg: 'delete API',
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server listing in port', this.port);
    });
  }
}

module.exports = Server;
