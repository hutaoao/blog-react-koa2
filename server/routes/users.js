const router = require('koa-router')();
const User = require('../controllers/user');

router.prefix('/user'); //设置路径前缀

router.get('/list', User.list);
router.post('/login', User.login);
router.post('/register', User.register);
router.post('/change-password', User.changePassword);

module.exports = router
