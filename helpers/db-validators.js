const User = require('../models/user');
const Role = require('../models/role');
const { Category, Product } = require('../models');

const isRoleValid = async (role) => {
  // Call Custom Middleware with the error
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`The role ${role} not exists in the BD`);
  }
};

const existEmail = async (email = '') => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`The email ${email} exists in the BD`);
  }
};

const existUserById = async (id) => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`The ID ${id} not exists in the BD`);
  }
};

const existCategoryById = async (id) => {
  const existCategory = await Category.findById(id);
  if (!existCategory) {
    throw new Error(`The ID ${id} the category not exists in the BD`);
  }
};

const existProductById = async (id) => {
  const existProduct = await Product.findById(id);
  if (!existProduct) {
    throw new Error(`The ID ${id} the product not exists in the BD`);
  }
};

/**
 *
 * Validate allowed collections
 */
const allowedCollections = (collection = '', collections = []) => {
  const included = collections.includes(collection);
  if (!included) {
    throw new Error(`The collection ${collection} is not allowed`);
  }

  return true;
};

module.exports = {
  isRoleValid,
  existEmail,
  existUserById,
  existCategoryById,
  existProductById,
  allowedCollections,
};
