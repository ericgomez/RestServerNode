const jwt = require('jsonwebtoken');

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

module.exports = {
  generateJWT,
};
