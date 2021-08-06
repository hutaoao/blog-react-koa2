import React, {FC} from 'react';
import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";

const {Header, Content, Sider} = Layout;

interface IProps {
  children: any
}

const index: FC<IProps> = props => {
  return (
    <Layout>
      <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
        <div className="logo"/>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to='/blog/home'>首页</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/blog/archive'>归档</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to='/blog/about'>关于</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
        {props.children}
      </Content>
    </Layout>
  )
}

export default index;
