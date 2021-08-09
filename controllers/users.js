const { request, response } = require('express');
const User = require('../models/user');

const usersGet = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: 'get API - Controller',
    query,
  });
};

const usersPost = async (req, res = response) => {
  const body = req.body;
  const user = new User(body); // Add and validate defined fields

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
