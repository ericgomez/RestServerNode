const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

// Implement Middleware for check if email is valid
router.post('/', check('email', 'The email is invalid').isEmail(), usersPost);

router.put('/:id', usersPut);

router.delete('/:id', usersDelete);

module.exports = router;
