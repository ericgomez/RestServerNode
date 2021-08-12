const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

// The function validateFields is required to make it work the message of express-validator
/**
 * {{url}}/api/categories
 */

// get all categories - public
router.get('/', (req, res) => {
  res.json('get');
});

// get one category by id - public
router.get('/:id', (req, res) => {
  res.json('get - id');
});

// create one category - private - only users with a valid token
router.post('/', (req, res) => {
  res.json('post');
});

// update one category - private - only users with a valid token
router.put('/:id', (req, res) => {
  res.json('put');
});

// delete one category - private - only is Admin
router.delete('/:id', (req, res) => {
  res.json('delete');
});

module.exports = router;
