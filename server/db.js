//连接数据库
const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog-react', 'root', 'qwer1234', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('MYSQL 连接成功......');
  })
  .catch(err => {
    console.error('链接失败:', err);
  });

// 根据模型自动创建表
sequelize.sync();

module.exports = sequelize;
