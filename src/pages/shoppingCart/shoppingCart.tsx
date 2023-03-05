import React from "react";
import styles from './shoppingCart.module.css'
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col, Affix } from 'antd';
import { ProductList, PaymentCard } from "../../components";

//私有路由嵌入用户JWT信息 用于判断是否登录 启动私有路由
export const ShoppingCartPage: React.FC = () =>{
    return(
        <MainLayout>
            <Row>
                {/* 购物车清单 */}
                <Col span={16}>
                    <div className={styles["product-list-container"]}>
                        {/* <ProductList /> */}
                    </div>
                </Col>
                {/* 支付卡组件 */}
                <Col span={8}>
                    {/* 锚点元素包裹 使其保持页面滑动时位置不变 */}
                    <Affix> 
                        <div className={styles["payment-card-container"]}>
                            {/* <PaymentCard /> */}
                            购物车
                        </div>
                    </Affix>
                </Col>    
            </Row>
        </MainLayout>
    )
}