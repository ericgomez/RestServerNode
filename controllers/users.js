const { response } = require('express');

const usersGet = (req, res = response) => {
  res.json({
    msg: 'get API - Controller',
  });
};

const usersPost = (req, res = response) => {
  const { name, age } = req.body;

  res.status(201).json({
    msg: 'post API - Controller',
    name,
    age,
  });
};

const usersPut = (req, res) => {
  res.json({
    msg: 'put API - Controller',
  });
};

const usersDelete = (req, res) => {
  res.json({
    msg: 'delete API - Controller',
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
