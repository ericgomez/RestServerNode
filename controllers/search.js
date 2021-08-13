const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models');

const allowedCollections = ['users', 'categories', 'products', 'roles'];

const userSearch = async (end = '', res = response) => {
  const isMongoID = ObjectId.isValid(end); // True

  if (isMongoID) {
    const user = await User.findById(end);
    res.json({
      results: user ? [user] : [], // Validate
    });
  }

  // TODO: expression insensitive a uppercase and lowercase of the
  const regex = new RegExp(end, 'i');

  // TODO: search by name o email in DB
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  }); // search by name

  res.json({
    results: users,
  });
};

const search = (req = request, res = response) => {
  const { collection, end } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `The collections allowed are: ${allowedCollections}`,
    });
  }

  switch (collection) {
    case 'users':
      userSearch(end, res);
      break;
    case 'categories':
      break;
    case 'products':
      break;

    default:
      res.status(500).json({
        msg: `Internal error server`,
      });
      break;
  }
};

module.exports = { search };
