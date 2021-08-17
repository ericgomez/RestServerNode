const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin, renewToken } = require('../controllers/auth');
const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

// The function validateFields is required to make it work the message of express-validator
router.post(
  '/login',
  [check('email', 'The email is required').isEmail(), check('password', 'The password is required').not().isEmpty(), validateFields],
  login
);

router.post('/google', [check('id_token', 'The id_token is required').not().isEmpty(), validateFields], googleSignin);

router.get('/', validateJWT, renewToken);

module.exports = router;
