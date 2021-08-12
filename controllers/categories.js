const { request, response } = require('express');
const { Category } = require('../models');

// getCategories - paginate - total - populate with user
const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  // everyone with the active status
  const active = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments({ status: true }),
    Category.find(active).populate('user', 'name').skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    categories,
  });
};

// getCategory - populate with user
const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate('user', 'name');

  res.json({
    category,
  });
};

// createCategory
const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `The category ${categoryDB.name}, exist`,
    });
  }

  // Generate data as saved
  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);

  // save DB
  await category.save();

  res.status(201).json(category);
};

// updateCategory
const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  // Change name to Uppercase
  data.name = data.name.toUpperCase();
  // Add user property token
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};
// deleteCategory - status change to false

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, { status: false });

  res.json({
    category,
  });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
