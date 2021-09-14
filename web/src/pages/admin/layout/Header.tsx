import React, {FC, useState} from 'react';
import styles from './index.module.less';
import {inject, observer} from 'mobx-react';
import {useHistory} from "react-router-dom";
import {DownOutlined} from '@ant-design/icons';
import {Menu, Dropdown, Button, Breadcrumb, Modal, Form, Input} from 'antd';

interface IProps {
  loginStore?: any;
}

const Index: FC<IProps> = (props) => {

  const history = useHistory();
  const username = sessionStorage.getItem('username');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleMenu = (item: any) => {
    if (item.key === '1') {
      // 修改密码
      setModalVisible(true);
    } else {
      // 退出登录
      sessionStorage.clear();
      history.push('/login');
    }
  }

  const menu = (
    <Menu onClick={handleMenu}>
      <Menu.Item key='1'>修改密码</Menu.Item>
      <Menu.Item key='2' danger>退出登录</Menu.Item>
    </Menu>
  );

  const onFinish = async (values: any) => {
    const {loginStore: {fetchChangePassword}} = props;
    const {code, msg} = await fetchChangePassword({password: values.newPassword, id: 1});
    console.log(code, msg)
  }

  const handleCancel = () => {
    setModalVisible(false);
  }

  return (
    <div className={styles.headerBox}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
      <Dropdown overlay={menu}>
        <Button type='link'>{username} <DownOutlined/></Button>
      </Dropdown>
      <Modal
        width={400}
        title="修改密码"
        visible={modalVisible}
        onCancel={handleCancel}
        okButtonProps={{htmlType: 'submit', form: 'editForm'}}
      >
        <Form
          id="editForm"
          onFinish={onFinish}
        >
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[{required: true, message: 'Please input your new password!'}]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[{required: true, message: 'Please input your old password!'}]}
          >
            <Input.Password/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default inject('loginStore')(observer(Index));
