const db = require('../db');
const Sequelize = require('sequelize');

const user = db.define('user', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    unique: {
      msg: '该用户已存在'
    },
    allowNull: false,
    validate: {
      notNull: true,
    }
  },
  password: {
    type: Sequelize.INTEGER(2),
    validate: {
      len: [6, 10],
    }
  },
}, {freezeTableName: true})

user.sync({alter: true}); // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

module.exports = user;
