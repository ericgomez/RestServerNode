const Role = require('../models/role');

const isRoleValid = async (role) => {
  // Call Custom Middleware with the error
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`The role ${role} not exists in the BD`);
  }
};

module.exports = {
  isRoleValid,
};
