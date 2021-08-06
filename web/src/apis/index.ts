/**
 * 根据api url动态生成request方法
 */
import axios from './request';
import apis from './apis';

const applyApi = "";

const gen = (params: any) => {
  let url = applyApi + params;
  let method: any = 'GET';
  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = applyApi + paramsArray[1]
  }
  return (data: any) => {
    return axios(url, {
      [method === 'GET' ? 'params' : 'data']: data, //`params` 是请求一起发送的 URL 参数，`data` 是作为请求主体被发送的数据
      method,
    })
  }
}
const APIFunction: any = {}
for (const key in apis) {
  if (!apis.hasOwnProperty(key)) {
    continue;
  }
  APIFunction[key] = gen(apis[key])
}

export default APIFunction;
