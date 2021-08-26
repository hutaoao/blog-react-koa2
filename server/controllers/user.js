const user = require('../model/user');
const {Op, and} = require('sequelize');

const list = async (ctx) => {
  const data = await user.findAll()
  ctx.body = {
    data,
    code: 1000,
    desc: 'success'
  }
}

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
    ctx.body = {
      data,
      code: data ? 1000 : 10003,
      msg: data ? '登录成功' : '密码错误'
    }
  } catch (err) {
    const msg = err.errors[0]
    ctx.body = {
      code: 200,
      msg: msg.value + msg.message
    }
  }
}

const changePassword = async (ctx) => {
  try {
    await user.update({password: ctx.query.password}, {
      where: {
        id: ctx.query.id
      }
    });
    ctx.body = {
      code: 1000,
      data: 'update success'
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
