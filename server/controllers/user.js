const util = require('util');
const user = require('../model/user');
const {Op} = require('sequelize');
const jwt = require('jsonwebtoken'); //生成token

const SECRET = "ht-blog-secret";// 这是加密的key（密钥）
const verify = util.promisify(jwt.verify);

const list = async (ctx) => {
  const data = await user.findAll()
  ctx.body = {
    data,
    code: 1000,
    desc: 'success'
  }
}

// 注册
const register = async (ctx) => {
  try {
    await user.create(ctx.request.body);
    ctx.body = {
      code: 1000,
      msg: '注册成功'
    }
  } catch (err) {
    const msg = err.errors[0]
    ctx.body = {
      code: 200,
      msg: msg.value + msg.message
    }
  }
}

// 登录
const login = async (ctx) => {
  try {
    const params = ctx.request.body
    const haveName = await user.findOne({
      where: {
        username: {
          [Op.eq]: params.username
        }
      }
    })
    if (!haveName) {
      ctx.body = {
        code: 1003,
        msg: '账号不存在'
      }
      return false;
    }
    const data = await user.findOne({
      where: {
        [Op.and]: [
          {username: params.username},
          {password: params.password},
        ]
      }
    })
    if(data) {
      const token = jwt.sign(data.dataValues, SECRET, {
        expiresIn: 60 * 5  // 1小时过期
      });
      ctx.body = {
        data,
        token,
        code: 1000,
        msg: '登录成功'
      }
    }else {
      ctx.body = {
        code: 1003,
        msg: '密码错误'
      }
    }
  } catch (err) {
    const msg = err.errors[0]
    ctx.body = {
      code: 200,
      msg: msg.value + msg.message
    }
  }
}

// 修改密码
const changePassword = async (ctx) => {
  const params = ctx.request.body;
  // console.log(ctx);
  // console.log(jwt.verify(ctx.request.header.token, SECRET));
  try {
    await user.update({password: params.password}, {
      where: {
        id: params.id
      }
    });
    ctx.body = {
      code: 1000,
      data: '修改成功'
    }
  } catch (err) {
    const msg = err.errors[0]
    ctx.body = {
      code: 200,
      data: msg.value + msg.message
    }
  }
}

module.exports = {
  list,
  login,
  register,
  changePassword
}
