const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      user: '/api/users',
    };

    // Connect DB
    this.connectDB();

    // Middleware
    this.middleware();

    // Routes of application
    this.routes();
  }

  async connectDB() {
    await dbConnection();
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
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.user, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server listing in port', this.port);
    });
  }
}

module.exports = Server;
