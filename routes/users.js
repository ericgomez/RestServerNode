const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');
const { isRoleValid } = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet);

// Implement Middleware for check if email is valid
router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password requires more than 6 letters').isLength({ min: 6 }),
    check('email', 'The email is invalid').isEmail(),
    // check('role', 'The role is invalid').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('role').custom((role) => isRoleValid(role)),
    validateFields, // Call Custom Middleware with the error
  ],
  usersPost
);

router.put('/:id', usersPut);

router.delete('/:id', usersDelete);

module.exports = router;
