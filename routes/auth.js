const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

// The function validateFields is required to make it work the message of express-validator
router.post(
  '/login',
  [check('email', 'The email is required').isEmail(), check('password', 'The password is required').not().isEmpty(), validateFields],
  login
);

module.exports = router;
