const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
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

    req.uid = uid; // Update req with new date uid

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
