const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/products');
const { existProductById, existCategoryById } = require('../helpers/db-validators');
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

// The function validateFields is required to make it work the message of express-validator
/**
 * {{url}}/api/products
 */

// get all products - public
router.get('/', getProducts);

// get one product bi id - public
router.get('/:id', [check('id', 'The ID is invalid').isMongoId(), check('id').custom(existProductById), validateFields], getProduct);

// create one product - private - only user with a valid token
router.post(
  '/',
  [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'The ID is invalid').isMongoId(),
    check('category').custom(existCategoryById),
    validateFields,
  ],
  createProduct
);

// update one category - private - only users with a valid token
router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom(existProductById),
    check('category', 'The ID is invalid').isMongoId(),
    check('category').custom(existCategoryById),
    validateFields,
  ],
  updateProduct
);

// delete one product - private - only is admin
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom((id) => existProductById(id)),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
