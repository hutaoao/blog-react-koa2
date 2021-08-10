const router = require('koa-router')();
const User = require('../controllers/user');

router.prefix('/user'); //设置路径前缀

router.get('/list', User.list);
router.get('/register', User.register);
router.get('/change-password', User.changePassword);

module.exports = router
