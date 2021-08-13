const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, extensionsValid = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
  return new Promise((resolve, reject) => {
    const { myFile } = files;

    const nameChunk = myFile.name.split('.');
    const extension = nameChunk[nameChunk.length - 1];

    // extension validate
    if (!extensionsValid.includes(extension)) {
      return reject(`The extension ${extension} is not valid`);
    }

    const nameTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

    myFile.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nameTemp);
    });
  });
};

module.exports = {
  uploadFile,
};
