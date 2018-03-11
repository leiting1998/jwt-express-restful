const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/user.controller');

const checkAuth = require('../middlewares/check-auth');             // 判断用户令牌是否过期

router.get('/', checkAuth, usersControllers.find);

// 登录
router.post('/login', usersControllers.login);

// 注册
router.post('/register', usersControllers.add);

// 更新
router.patch('/:userId',checkAuth, usersControllers.update);

// 删除
router.delete('/:userId',checkAuth, usersControllers.delete);

module.exports = router;