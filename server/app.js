const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaJwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');

const index = require('./routes/index');
const users = require('./routes/users');

const SECRET = "ht-blog-secret";// 这是加密的key（密钥）

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 请求日志 + jwtToken拦截
app.use(async (ctx, next) => {
  console.log(ctx)
  // 日志
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);

  // 拦截

})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// 全局校验
app.use(koaJwt({secret: SECRET}).unless({
  // 登录接口不需要验证
  path: [/^\/login/]
}));

module.exports = app
