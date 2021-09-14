import React, {FC, useState} from 'react';
import MySider from './Sider';
import MyHeader from './Header';
import {Layout} from "antd";
import styles from './index.module.less';

interface IProps {
  children: any;
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
          theme='light'
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className={styles.layoutSider}
        >
          <MySider/>
        </Sider>
        <Layout>
          <Header className={styles.layoutHeader}>
            <MyHeader/>
          </Header>
          <Content className={styles.layoutContent}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Index;
