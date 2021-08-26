const api = '';

const Apis: any = {
  testApi: `GET ${api}/json`, // 测试
  testApi2: `GET ${api}/string`, // 测试
  login: `POST ${api}/user/login`, // 登录
  register: `POST ${api}/user/register`, // 注册
}

export default Apis;
