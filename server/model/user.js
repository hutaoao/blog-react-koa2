const db = require('../db');
const Sequelize = require('sequelize');

const user = db.define('user', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: '请输入你的名字'
      },
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [4, 10],
    }
  },
}, {freezeTableName: true})

user.sync({alter: true}); // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

module.exports = user;
