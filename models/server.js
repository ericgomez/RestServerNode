const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');

const { dbConnection } = require('../database/config');
const { socketController } = require('../sockets/controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths = {
      auth: '/api/auth',
      search: '/api/search',
      categories: '/api/categories',
      products: '/api/products',
      users: '/api/users',
      uploads: '/api/uploads',
    };

    // Connect DB
    this.connectDB();

    // Middleware
    this.middleware();

    // Routes of application
    this.routes();

    // Sockets
    this.sockets();
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

    // FileUpload - Carga de archivos
    // Note that this option available for versions 1.0.0 and newer.
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.users, require('../routes/users'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Server listing in port', this.port);
    });
  }
}

module.exports = Server;
