import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import {Layout, Typography, Input, Button, Dropdown, MenuProps} from "antd" //title属于Typography子组件
import { GlobalOutlined } from "@ant-design/icons"
import ButtonGroup from 'antd/es/button/button-group';

const items: MenuProps['items'] = [
  {
    key:'1',
    label:'中文'
  },
  {
    key:'2',
    label:'English'
  }
]

function App() {
  return (
    <div className={styles.App}>
      <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          <Dropdown.Button menu={{ items }} style={{marginLeft: 15, display: 'inline'}} icon={<GlobalOutlined />}>
            语言
          </Dropdown.Button>
          <ButtonGroup className={styles['button-group']}>
            <Button>注册</Button>
            <Button>登录</Button>
          </ButtonGroup>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="logo" className = {styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>React 旅游网</Typography.Title>
          <Input.Search 
          placeholder={'请输入旅游目的地、主题、或关键字'}
          className={styles['search-input']} />
        </Layout.Header>
      </div>
    </div>
  );
}

export default App;

