const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const ctrl = require('../controllers/post.controller');

router.post('/', auth, ctrl.createPost);
router.get('/feed', ctrl.getFeed);

module.exports = router;
