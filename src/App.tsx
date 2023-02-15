import React from 'react';
import styles from './App.module.css';
import { Header, Footer} from "./components"
import { Row, Col } from 'antd';



function App() {
  return (
    <div className={styles.App}>
      <Header />
      {/*页面内容 content*/}
      <div className={styles['page-content']}>
        <Row style={{marginTop: 20}}>
          {/* 1:3 比例*/}
          <Col span={6}>
            <div style={{background:"red"}}>多重菜单</div>
          </Col>
          <Col span={18}>
            <div style={{backgroundColor:"blue"}}>走马灯</div>
          </Col> 
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default App;

