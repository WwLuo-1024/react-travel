import React from "react";
import styles from "./Header.module.css"
import logo from '../../assets/logo.svg';
import {Layout, Typography, Input, Button, Dropdown, MenuProps, Menu} from "antd" //title属于Typography子组件
import { GlobalOutlined } from "@ant-design/icons"
import ButtonGroup from 'antd/es/button/button-group';
import { RouterComponentProps, withRouter } from '../../helpers/withRouter'
import store from "../../redux/store";
import { languageState } from "../../redux/languageReducer"


// interface State{
//   language: "zh" | "en",
//   languageList: {name: string; code: string}[];
// }

interface State extends languageState{}

class HeaderComponent extends React.Component<RouterComponentProps, State>{
    constructor(props){
      super(props);

      const storeState = store.getState();
      // storeState.language
      // storeState.languageList
      this.state = {
        language: storeState.language,
        languageList: storeState.languageList
      }
    }
  
    render(){
    const {navigate} = this.props;
    var items: MenuProps['items'] = this.state.languageList.map((l) =>{
      return{
        key: l.code, label: l.name
      }
    })
    return(
        <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          {/* <Dropdown.Button menu={{ items }} style={{marginLeft: 15, display: 'inline'}} icon={<GlobalOutlined />} >
            {this.state.language === "zh" ? "中文" : "English"}
          </Dropdown.Button> */}

          <Dropdown.Button menu={{ items }} style={{marginLeft: 15, display: 'inline'}} icon={<GlobalOutlined />} >
            {this.state.language === "zh" ? "中文" : "English"}
          </Dropdown.Button>

          <ButtonGroup className={styles['button-group']}>
            <Button onClick={()=>navigate("/signin")}>登录</Button>
            <Button onClick={()=>navigate("/register")}>注册</Button>
          </ButtonGroup>
          </div>
        </div>

        <Layout.Header className={styles['main-header']}>
          <span onClick={()=>navigate("/")}>
          <img src={logo} alt="logo" className = {styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>React 旅游网</Typography.Title>
          </span>
          
          <Input.Search 
          placeholder={'请输入旅游目的地、主题、或关键字'}
          className={styles['search-input']} />
        </Layout.Header>
        
        <Menu mode={"horizontal"} className={styles['main-menu']}
        items = {[
          {key:1, label:"旅游首页"},
          {key:2, label:"跟团游"},
          {key:3, label:"周末游"},
          {key:4, label:"自由行"},
          {key:5, label:"私家团"},
          {key:6, label:"游轮"},
          {key:7, label:"酒店+景点"},
          {key:8, label:"当地玩乐"},
          {key:9, label:"主题游"},
          {key:10, label:"定制游"},
          {key:11, label:"游学"},
          {key:12, label:"签证"},
          {key:13, label:"企业游"},
          {key:14, label:"高端游"},
          {key:15, label:"爱玩户外"},
          {key:16, label:"保险"},
        ]}>
        </Menu>
      </div>
    )
    }
  
    
}

export const Header = withRouter(HeaderComponent)