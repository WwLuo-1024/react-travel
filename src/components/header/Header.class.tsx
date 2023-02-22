import React, { Dispatch } from "react";
import styles from "./Header.module.css"
import logo from '../../assets/logo.svg';
import {Layout, Typography, Input, Button, Dropdown, MenuProps, Menu, message} from "antd" //title属于Typography子组件
import { GlobalOutlined } from "@ant-design/icons"
import ButtonGroup from 'antd/es/button/button-group';
import { RouterComponentProps, withRouter } from '../../helpers/withRouter'
import  { RootState } from "../../redux/store";
// import { languageState } from "../../redux/language/languageReducer"
import { withTranslation, WithTranslation } from 'react-i18next'
import { addLanguageCreater, changeLanguageActionCreater } from "../../redux/language/languageActions";
import { connect } from "react-redux";

// interface State{
//   language: "zh" | "en",
//   languageList: {name: string; code: string}[];
// }


// interface State extends languageState{}

const mapStateToProps =(state: RootState) =>{
  return{
    language: state.language,
    languageList: state.languageList
  }
}

//react redux dispatch
const mapDispatchToProps = (dispatch: Dispatch<any>) =>{
  return{
    changeLanguage: (code:string)=>{
      const action = changeLanguageActionCreater(code);
      dispatch(action);
    },
    addLanguage: (name: string, code: string)=>{
      const action = addLanguageCreater(name, code);
      dispatch(action)
    }
  }
};


type PropsType = RouterComponentProps & //react-router 路由props类型
WithTranslation &                       //i18n props类型
ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps>;     //react redux store映射类型

class HeaderComponent extends React.Component<PropsType>{
// ,State

    // constructor(props){
    //   super(props);
    //   const storeState = store.getState();
    //   // storeState.language
    //   // storeState.languageList
    //   this.state = {
    //     language: storeState.language,
    //     languageList: storeState.languageList
    //   };
      
    //   //store subscribe
    //   store.subscribe(this.handlesStoreChange);
    // }

    //自创建的store订阅代码 被react redux取代
    // handlesStoreChange = ()=>{
    //   const storeState = store.getState();
    //     this.setState({
    //       language: storeState.language,
    //       languageList: storeState.languageList
    //     });
    // }
    

    render(){
    const {navigate, t} = this.props;
    
    //menu items
    const items: MenuProps['items'] = [...this.props.languageList.map((l) =>{
      return{
        key: l.code, label: l.name
      }
    }), {key: "new", label:"添加新语言"}]

    //menuClick
    const handleMenuClick: MenuProps['onClick'] = (e) => {
      message.info('Language Changed');
      console.log('click', e);

      //[Action] dispatch announce store to update data
      if(e.key === "new"){
        // const action =
        //older
        // {
        //   type:"add_language",
        //   payload: {code:"new_lang", name:"新语言"},
        // };
        //

        //old
        // addLanguageCreater("新语言", 'new_lang')
        // store.dispatch(action)
        //

        //new logic
        this.props.addLanguage("新语言", "new_lang")
      }else{
        // const action = 

        // {
        //   type: "change_language",
        //   payload: e.key,
        // };

        // changeLanguageActionCreater(e.key)
        // store.dispatch(action)

        //new
        this.props.changeLanguage(e.key)
      }
      
      
    };

    //menuProps
    const menuProps = {
      items,
      onClick:handleMenuClick
    }
    return(
        <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          {/* <Dropdown.Button menu={{ items }} style={{marginLeft: 15, display: 'inline'}} icon={<GlobalOutlined />} >
            {this.state.language === "zh" ? "中文" : "English"}
          </Dropdown.Button> */}

          <Dropdown.Button menu={ menuProps } style={{marginLeft: 15, display: 'inline'}} icon={<GlobalOutlined />} >
            {this.props.language === "zh" ? "中文" : "English"}
          </Dropdown.Button>

          <ButtonGroup className={styles['button-group']}>
            <Button onClick={()=>navigate("/signin")}>{t("header.signin")}</Button>
            <Button onClick={()=>navigate("/register")}>{t("header.register")}</Button>
          </ButtonGroup>
          </div>
        </div>

        <Layout.Header className={styles['main-header']}>
          <span onClick={()=>navigate("/")}>
          <img src={logo} alt="logo" className = {styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
          </span>
          
          <Input.Search 
          placeholder={'请输入旅游目的地、主题、或关键字'}
          className={styles['search-input']} />
        </Layout.Header>
        
        <Menu mode={"horizontal"} className={styles['main-menu']}
        items = {[
          { key: "1", label: t("header.home_page") },
          { key: "2", label: t("header.weekend") },
          { key: "3", label: t("header.group") },
          { key: "4", label: t("header.backpack") },
          { key: "5", label: t("header.private") },
          { key: "6", label: t("header.cruise") },
          { key: "7", label: t("header.hotel") },
          { key: "8", label: t("header.local") },
          { key: "9", label: t("header.theme") },
          { key: "10", label: t("header.custom") },
          { key: "11", label: t("header.study") },
          { key: "12", label: t("header.visa") },
          { key: "13", label: t("header.enterprise") },
          { key: "14", label: t("header.high_end") },
          { key: "15", label: t("header.outdoor") },
          { key: "16", label: t("header.insurance") },
        ]}>
        </Menu>
      </div>
    )
    }
  
    
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent))) 