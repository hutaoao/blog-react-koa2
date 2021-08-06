import React, {FC, useState} from 'react';
import MySider from './Sider';
import MyHeader from './Header';
import {Layout} from "antd";

interface IProps {
  children: any
}

const {Header, Content, Sider} = Layout;

const Index: FC<IProps> = props => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <div>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
          collapsible collapsed={collapsed} onCollapse={onCollapse}
        >
          <MySider/>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{padding: 0}}>
            <MyHeader/>
          </Header>
          <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Index;
