const { request, response } = require('express');
const { uploadFile } = require('../helpers');

const { User, Product } = require('../models');

const loadFile = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    res.status(400).json({ msg: 'No files were uploaded.' });
    return;
  }

  try {
    //const name = await uploadFile(req.files, ['txt', 'md'], 'text');
    const name = await uploadFile(req.files, undefined, 'imgs');

    res.json({
      name,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateFile = async (req = request, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is not user with the id ${id}`,
        });
      }
      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is not product with the id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: 'Internal Error',
      });
  }

  // Create folder with name the collection
  const name = await uploadFile(req.files, undefined, collection);
  model.img = name;

  // Save file en DB
  await model.save();

  res.json(model);
};

module.exports = {
  loadFile,
  updateFile,
};
