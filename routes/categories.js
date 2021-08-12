const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { existCategoryById } = require('../helpers/db-validators');

const router = Router();

// The function validateFields is required to make it work the message of express-validator
/**
 * {{url}}/api/categories
 */

// get all categories - public
router.get('/', getCategories);

// get one category by id - public
router.get('/:id', [check('id', 'The ID is invalid').isMongoId(), check('id').custom(existCategoryById), validateFields], getCategory);

// create one category - private - only users with a valid token
router.post('/', [validateJWT, check('name', 'The name is required').not().isEmpty(), validateFields], createCategory);

// update one category - private - only users with a valid token
router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
  ],
  updateCategory
);

// delete one category - private - only is Admin
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom((id) => existCategoryById(id)),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
