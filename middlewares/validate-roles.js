const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Is required to verify the role after validating the token',
    });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `user ${name} is not admin`,
    });
  }

  next();
};

module.exports = {
  isAdminRole,
};
