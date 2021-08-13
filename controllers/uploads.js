const path = require('path');
const { request, response } = require('express');

const loadFile = (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
    res.status(400).json({ msg: 'No files were uploaded.' });
    return;
  }

  const { myFile } = req.files;

  const nameChunk = myFile.name.split('.');
  const extension = nameChunk[nameChunk.length - 1];

  // extension validate
  const extensionValidate = ['png', 'jpg', 'jpeg', 'gif'];

  if (!extensionValidate.includes(extension)) {
    return res.status(400).json({
      msg: `The extension ${extension} is not valid`,
    });
  }

  res.json({ extension });

  // const uploadPath = path.join(__dirname, '../uploads/', myFile.name);

  // myFile.mv(uploadPath, (err) => {
  //   if (err) {
  //     return res.status(500).send({ err });
  //   }

  //   res.json({ msg: 'File uploaded to ' + uploadPath });
  // });
};

module.exports = {
  loadFile,
};
