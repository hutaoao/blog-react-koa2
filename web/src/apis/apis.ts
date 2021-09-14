const api = '';

const Apis: any = {
  testApi: `GET ${api}/json`, // 测试
  testApi2: `GET ${api}/string`, // 测试
  login: `POST ${api}/user/login`, // 登录
  register: `POST ${api}/user/register`, // 注册
  changePassword: `POST ${api}/user/change-password`, // 修改密码
}

export default Apis;
