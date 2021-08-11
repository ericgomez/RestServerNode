const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, isAdminRole, hasRole } = require('../middlewares');

const { isRoleValid, existEmail, existUserById } = require('../helpers/db-validators');
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');

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
    check('email').custom((email) => existEmail(email)),
    check('role').custom((role) => isRoleValid(role)),
    validateFields, // Call Custom Middleware with the error
  ],
  usersPost
);

check('role').custom((role) => isRoleValid(role)),
  router.put(
    '/:id',
    [
      check('id', 'The ID is invalid').isMongoId(),
      check('id').custom((id) => existUserById(id)),
      check('role').custom((role) => isRoleValid(role)),
      validateFields,
    ],
    usersPut
  );

router.delete(
  '/:id',
  [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom((id) => existUserById(id)),
    validateFields,
  ],
  usersDelete
);

module.exports = router;
