const { request, response } = require('express');

const usersGet = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: 'get API - Controller',
    query,
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
