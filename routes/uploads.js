const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { loadFile } = require('../controllers/uploads');

const router = Router();

// The function validateFields is required to make it work the message of express-validator
router.post('/', loadFile);

module.exports = router;
