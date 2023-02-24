import React from "react";
import styles from './homePage.module.css'

import { Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartner} from "../../components"
import { Row, Col, Typography, Spin } from 'antd';
// import {productList1, productList2, productList3} from './mockups'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import { withTranslation, WithTranslation } from "react-i18next"
//withTranslation是高阶组件 WithTranslation是typeScript类型定义
import axios from "axios";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchRecommendProductStartActionCreater, fetchRecommendProductFailActionCreater, fetchRecommendProductSuccessActionCreater } from "../../redux/recommendProducts/recommendProductsActions";
 
// console.log(productList1)

// interface State{
//   loading: boolean, //用于处理UI渲染前悬空数据 此时API数据还没被挂载
//   productList: any[], //用于处理加载数据失败的情况
//   error: string | null
// }

const mapStateToProps = (state: RootState)=>{
  return{
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    fetchStart: ()=>{
      dispatch(fetchRecommendProductStartActionCreater())
    },
    fetchSuccess: (data) =>{
      dispatch(fetchRecommendProductSuccessActionCreater(data))
    },
    fetchFail: (error)=>{
      dispatch(fetchRecommendProductFailActionCreater(error))
    }
  }
};

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>


class HomePageComponent extends React.Component<PropsType>{

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     loading: true,
  //     error: null, 
  //     productList: [],
  //   }
  // }

  async componentDidMount(){
    this.props.fetchStart()
    try{
      const {data} = await axios.get("http://123.56.149.216:8080/api/productCollections" //axios.get本身是Promise
      // headers:{ 局部请求需改为全局请求
      //   "x-icode" : "5BFE3F36A4F04F4E",
      // },
      );
    this.props.fetchSuccess(data)
    // this.setState({
    //   loading: false,
    //   productList:data,
    //   error: null
    // })
    }catch(error){
      if(error instanceof Error){
        this.props.fetchFail(error.message)
      }
    }
  }


    render() : React.ReactNode{
      // console.log(this.props.navigate)
      const {t, productList, loading, error} = this.props

      if(loading){
        return <Spin 
        size = "large"
        style={{
          marginTop:200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%"
        }}/>
      }
      if(error){
        return <div>网站出错:{error}</div>
      }
      return(
            <>
            <Header />
      {/*页面内容 content*/}
      <div className={styles['page-content']}>
        <Row style={{marginTop: 20}}>
          {/* 1:3 比例*/}
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col> 
        </Row>

        <ProductCollection
        title = {<Typography.Title level = {3} type = "warning">{t("home_page.hot_recommended")}</Typography.Title>}
        sideImage = {sideImage}
        products = {productList[0].touristRoutes}
        ></ProductCollection>

        <ProductCollection
        title = {<Typography.Title level = {3} type = "danger">{t("home_page.new_arrival")}</Typography.Title>}
        sideImage = {sideImage2}
        products = {productList[1].touristRoutes}
        ></ProductCollection>

        <ProductCollection
        title = {<Typography.Title level = {3} type = "success">{t("home_page.domestic_travel")}</Typography.Title>}
        sideImage = {sideImage3}
        products = {productList[2].touristRoutes}
        ></ProductCollection>
        <BusinessPartner />
      </div>
      <Footer />
            </>
        )
    }
}

export const HomePage = connect(mapStateToProps,mapDispatchToProps)(withTranslation()(HomePageComponent)) //第一个括号是命名空间 第二个括号是组件
// export const HomePage = withRouter(HomePageComponent)