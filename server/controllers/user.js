const user = require('../model/user');

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
    await user.create(ctx.query);
    ctx.body = {
      code: 1000,
      data: 'create success'
    }
  } catch (err) {
    const msg = err.errors[0]
    ctx.body = {
      code: 200,
      data: msg.value + msg.message
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
  register,
  changePassword
}
