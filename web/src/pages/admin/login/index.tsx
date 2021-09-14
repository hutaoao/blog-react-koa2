import React, {FC, useEffect, useState} from 'react'
import styles from './index.module.less';
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

  useEffect(() => {
    sessionStorage.clear();
  })

  const onFinish = async (values: any) => {
    let params: loginParams = {
      username: values.username,
      password: values.password,
    }
    const {loginStore: {fetchLogin, fetchRegister}, history} = props;
    if (isLogin) {
      const {code, token, data, msg} = await fetchLogin(params);
      if (code === 1000) {
        message.success(msg);
        sessionStorage.setItem('jwtToken', token);
        sessionStorage.setItem('username', data.username);
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
    <div className={styles.loginBox}>
      <Form
        name="normal_login"
        className={styles.loginForm}
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
          <Button type='link' className={styles.loginFormForgot}>
            Forgot password
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
            {isLogin ? 'Sign in' : 'Sign up'}
          </Button>
          Or
          <Button type='link' className={styles.loginFormRegister} onClick={goRegister}>
            {isLogin ? 'register now!' : 'login now!'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default inject('loginStore')(observer(Index));
