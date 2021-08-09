const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: 'get API - Controller',
    query,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role }); // Add and validate defined fields

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save DB

  await user.save(); // Save register

  res.status(201).json({
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  // Protect the application by excluding components that we do not want to add to the database
  const { _id, password, google, email, ...data } = req.body;

  // TODO: Validate vs DB
  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, data);

  res.json({
    msg: 'put API - Controller',
    user,
  });
};

const usersDelete = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: 'delete API - Controller',
    id,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
