const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Check if email exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'User / Password is not correct - email',
      });
    }

    // Check if user is active
    if (!user.state) {
      return res.status(400).json({
        msg: 'User / Password is not correct - email',
      });
    }
    // Check password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User / Password is not correct - password',
      });
    }
    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Internal error',
    });
  }
};

module.exports = {
  login,
};
