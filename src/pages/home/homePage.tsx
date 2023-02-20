import React from "react";
import styles from './homePage.module.css'

import { Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartner} from "../../components"
import { Row, Col, Typography } from 'antd';
import {productList1, productList2, productList3} from './mockups'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import { withTranslation, WithTranslation } from "react-i18next"
//withTranslation是高阶组件 WithTranslation是typeScript类型定义
 
console.log(productList1)

class HomePageComponent extends React.Component<WithTranslation>{
    render() : React.ReactNode{
      // console.log(this.props.navigate)
      const {t} = this.props
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
        products = {productList1}
        ></ProductCollection>

        <ProductCollection
        title = {<Typography.Title level = {3} type = "danger">{t("home_page.new_arrival")}</Typography.Title>}
        sideImage = {sideImage2}
        products = {productList2}
        ></ProductCollection>

        <ProductCollection
        title = {<Typography.Title level = {3} type = "success">{t("home_page.domestic_travel")}</Typography.Title>}
        sideImage = {sideImage3}
        products = {productList3}
        ></ProductCollection>
        <BusinessPartner />
      </div>
      <Footer />
            </>
        )
    }
}

export const HomePage = withTranslation()(HomePageComponent) //第一个括号是命名空间 第二个括号是组件
// export const HomePage = withRouter(HomePageComponent)