const { request, response } = require('express');
const { uploadFile } = require('../helpers');

const loadFile = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    res.status(400).json({ msg: 'No files were uploaded.' });
    return;
  }

  const name = await uploadFile(req.files);

  res.json({
    name,
  });
};

module.exports = {
  loadFile,
};
