const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token'); // Name personal of token

  if (!token) {
    return res.status(401).json({
      msg: 'There is no token in the request',
    });
  }

  try {
    // Check JSON WEB TOKEN
    // get uid from JSON WEB TOKEN
    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);

    // read model the user corresponds the uid
    const user = await User.findById(uid);

    // check user exist
    if (!user) {
      return res.status(401).json({
        msg: 'Token is not valid',
      });
    }

    // check id the uid has the state in true
    if (!user.state) {
      return res.status(401).json({
        msg: 'Token is not valid',
      });
    }

    req.user = user; // Update req with new date user

    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};

module.exports = {
  validateJWT,
};
