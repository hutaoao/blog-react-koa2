import React, {useEffect, useState} from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import logo from '../../../assets/anchor.png';
import {
  HomeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
const {SubMenu} = Menu;

const Index = () => {
  const [openKeys, setOpenKeys] = useState<[string]>();
  const [selectedKeys, setSelectedKeys] = useState<[string]>(['1']);

  const selectMenu = (data: any) => {
    const {keyPath} = data;
    sessionStorage.setItem('selectedKeys', keyPath[0]);
    setSelectedKeys([keyPath[0]]);
    if(keyPath.length === 1) {
      sessionStorage.setItem('openKeys', '');
    }else {
      sessionStorage.setItem('openKeys', keyPath[1]);
      setOpenKeys([keyPath[1]]);
    }
  }

  useEffect(() => {
    const openK = sessionStorage.getItem('openKeys');
    const selectedK = sessionStorage.getItem('selectedKeys');
    if (openK) {
      setOpenKeys([openK]);
    }
    if (selectedK) {
      setSelectedKeys([selectedK]);
    }
  }, [])

  return (
    <div>
      <div>
        <img
          src={logo}
          alt="anchor"
          style={{
            width: '43px',
            display: 'block',
            margin: '12px auto',
          }}
        />
      </div>
      <Menu
        mode="inline"
        onSelect={selectMenu}
        defaultOpenKeys={openKeys}
        selectedKeys={selectedKeys}
        defaultSelectedKeys={selectedKeys}
      >
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

export default Index;
