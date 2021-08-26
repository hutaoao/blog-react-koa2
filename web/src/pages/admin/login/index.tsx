import React, {FC, useState} from 'react'
import './index.less';
import {inject, observer} from 'mobx-react';
import {Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

interface IProps {
  history?: any;
  loginStore?: any;
}

interface loginParams {
  username: string | number;
  password: string | number;
}

const Index: FC<IProps> = (props) => {
  const [isLogin, setLogin] = useState<boolean>(true);

  const onFinish = async (values: any) => {
    let params: loginParams = {
      username: values.username,
      password: values.password,
    }
    const {loginStore: {fetchLogin, fetchRegister}, history} = props;
    if (isLogin) {
      const {code, msg} = await fetchLogin(params);
      if (code === 1000) {
        message.success(msg);
        history.push('/admin/home');
      } else {
        message.error(msg);
      }
    } else {
      const {code, msg} = await fetchRegister(params);
      if (code === 1000) {
        message.success(msg);
      } else {
        message.error(msg);
      }
    }
  };

  const goRegister = () => {
    setLogin(!isLogin);
  }

  return (
    <div className='login-box'>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{remember: true}}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{required: true, message: 'Please input your Username!'}]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{required: true, message: 'Please input your Password!'}]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon"/>}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Button type='link' className="login-form-forgot">
            Forgot password
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {isLogin ? 'Sign in' : 'Sign up'}
          </Button>
          Or
          <Button type='link' className="login-form-register" onClick={goRegister}>
            {isLogin ? 'register now!' : 'login now!'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default inject('loginStore')(observer(Index));
