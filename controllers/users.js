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

  // Check if the mail exists
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    return res.status(400).json({
      msg: 'The email already exists',
    });
  }

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save DB

  await user.save(); // Save register

  res.status(201).json({
    user,
  });
};

const usersPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: 'put API - Controller',
    id,
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
