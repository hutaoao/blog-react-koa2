import {observable, action, makeObservable} from 'mobx';

import apis from '../../apis';

const {login, register} = apis;

class LoginStore {
  constructor() {
    makeObservable(this)
  }

  @observable name: string = '张三';
  @observable age: number = 18;

  @action
  fetchLogin = async (params: any) => {
    const {code, msg} = await login(params);
    return {code, msg};
  }

  @action
  fetchRegister = async (params: any) => {
    const {code, msg} = await register(params);
    return {code, msg};
  }
}

export default new LoginStore()
