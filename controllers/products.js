const { request, response } = require('express');
const { Product } = require('../models');

// getProducts - paginate - total - populate with  user
const getProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  // everyone with the active status
  const active = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments({ status: true }),
    Product.find(active).populate('user', 'name').populate('category', 'name').skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

// getProduct - populate with user
const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');

  res.json({
    product,
  });
};

// createProduct
const createProduct = async (req = request, res = response) => {
  const { status, user, ...resData } = req.body;

  const productDB = await Product.findOne({ name: resData.name });

  if (productDB) {
    return res.status(400).json({
      msg: `The product ${productDB.name}, exist`,
    });
  }

  const data = {
    name: resData.name.toUpperCase(),
    ...resData,
    user: req.user._id,
  };

  const product = new Product(data);

  // save DB
  await product.save();

  res.status(201).json(product);
};

// updateProduct
const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  if (data.name) {
    // Change name to Uppercase
    data.name = data.name.toUpperCase();
  }

  // Add user property token
  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, { status: false });

  res.json({
    product,
  });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
