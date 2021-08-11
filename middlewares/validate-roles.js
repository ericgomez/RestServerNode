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

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    //console.log(roles, req.user.role);

    if (!req.user) {
      return res.status(500).json({
        msg: 'Is required to verify the role after validating the token',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `insufficient scope`,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
