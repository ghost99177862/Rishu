const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');

router.post('/signup', ctrl.signup);
router.post('/verify', ctrl.verify);

module.exports = router;
