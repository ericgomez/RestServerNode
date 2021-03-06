const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, users] = await Promise.all([
    // Create a variable with the value of all existing records
    User.countDocuments({ state: true }),
    User.find({ state: true }).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
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

  res.json(user);
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  // Physical removal
  // const user = await User.findByIdAndDelete(id);

  // Change the status to false by marking as deleted
  const user = await User.findByIdAndUpdate(id, { state: false });

  // const authenticatedUser = req.user; // Note: get uid from validateJWT assigned in the line 23

  res.json({
    user,
    //authenticatedUser,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
