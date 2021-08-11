const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignin = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);
    //console.log(googleUser);

    res.json({
      msg: 'Todo ok! google signin',
      id_token,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Token of Google is not valid',
      googleUser,
    });
  }
};

module.exports = {
  login,
  googleSignin,
};
