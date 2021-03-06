const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL); // Configuration

const { request, response } = require('express');
const { uploadFile } = require('../helpers');

const { User, Product } = require('../models');

const loadFile = async (req = request, res = response) => {
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

  // clean preview file
  if (model.img) {
    // delete image of server
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  // Create folder with name the collection
  const name = await uploadFile(req.files, undefined, collection);
  model.img = name;

  // Save file en DB
  await model.save();

  res.json(model);
};

const updateFileCloudinary = async (req = request, res = response) => {
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

  // clean preview file
  if (model.img) {
    // delete image of cloudinary
    const nameChunk = model.img.split('/');
    const name = nameChunk[nameChunk.length - 1]; // get last element

    const [public_id] = name.split('.');

    // delete image of cloudinary
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.myFile;
  // Extract of response the secure_url
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  // save url in the model the img
  model.img = secure_url;

  // Save file en DB
  await model.save();

  res.json(model);
};

const showImage = async (req = request, res = response) => {
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

  // clean preview file
  if (model.img) {
    // delete image of server
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }

  const pathImage = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(pathImage);
};

module.exports = {
  loadFile,
  updateFile,
  showImage,
  updateFileCloudinary,
};
