const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFile } = require('../middlewares');
const { loadFile, updateFile, showImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const router = Router();

// The function validateFields is required to make it work the message of express-validator
router.post('/', validateFile, loadFile);

router.put(
  '/:collection/:id',
  [
    validateFile,
    check('id', 'The ID is invalid').isMongoId(),
    check('collection').custom((c) => allowedCollections(c, ['users', 'products'])),
    validateFields,
  ],
  updateFile
);

router.get(
  '/:collection/:id',
  [
    check('id', 'The ID is invalid').isMongoId(),
    check('collection').custom((c) => allowedCollections(c, ['users', 'products'])),
    validateFields,
  ],
  showImage
);

module.exports = router;
