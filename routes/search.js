const { Router } = require('express');
const { search } = require('../controllers/search');

const router = Router();

// import Controller
router.get('/:collection/:end', search);

module.exports = router;
