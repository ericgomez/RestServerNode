const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    // Generate JWT
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_PRIVATE_KEY,
      {
        expiresIn: '4h', // Time expires
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject('The token could not be generated');
        } else {
          resolve(token);
        }
      }
    );
  });
};

checkJWT = async (token = '') => {
  try {
    if (token.length < 10) {
      return null;
    }

    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    const user = await User.findById(uid);

    // exist user
    if (user) {
      // user state is true
      if (user.state) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateJWT,
  checkJWT,
};
