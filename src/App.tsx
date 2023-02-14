import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import {Layout, Typography, Input} from "antd" //title属于Typography子组件

function App() {
  return (
    <div className={styles.App}>
      <div>
        <Layout.Header>
          <img src={logo} alt="logo" className = {styles['App-logo']} />
          <Typography.Title level={3}>React 旅游网</Typography.Title>
          <Input.Search placeholder={'请输入旅游目的地、主题、或关键字'} />
        </Layout.Header>
      </div>
    </div>
  );
}

export default App;
