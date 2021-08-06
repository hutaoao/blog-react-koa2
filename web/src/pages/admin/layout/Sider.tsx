import React from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import {
  HomeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;

const index = () => {
  return (
    <div>
      <div>
        img
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined/>}>
          <Link to='/admin/home'>首页</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<FileTextOutlined/>} title="文章管理">
          <Menu.Item key="2">
            <Link to='/admin/tags'>标签</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to='/admin/articles'>文章</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default index;
