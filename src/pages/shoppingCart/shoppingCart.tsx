import React from "react";
import styles from './shoppingCart.module.css'
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col, Affix } from 'antd';
import { ProductList, PaymentCard } from "../../components";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { clearShoppingCartItem, checkout } from "../../redux/shoppingCart/slice";
import { useNavigate } from 'react-router-dom'

//私有路由嵌入用户JWT信息 用于判断是否登录 启动私有路由
export const ShoppingCartPage: React.FC = () => {

    const loading = useSelector(s => s.shoppingCart.loading)
    const shoppingCartItems = useSelector(s => s.shoppingCart.items)
    const jwt = useSelector(s => s.user.token) as string
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    console.log(shoppingCartItems)

    return (
        <MainLayout>
            <Row>
                {/* 购物车清单 */}
                <Col span={16}>
                    <div className={styles["product-list-container"]}>
                        
                        <ProductList data={shoppingCartItems.map(s => s.touristRoute)} />
                    </div>
                </Col>
                {/* 支付卡组件 */}
                <Col span={8}>
                    {/* 锚点元素包裹 使其保持页面滑动时位置不变 */}
                    <Affix>
                        <div className={styles["payment-card-container"]}>
                            <PaymentCard loading={loading}
                                originalPrice={shoppingCartItems
                                    .map(s => s.originalPrice)
                                    .reduce((a, b) => a + b, 0)}
                                price={shoppingCartItems.map((s) =>
                                    s.originalPrice * (s.discountPresent ? s.discountPresent : 1))
                                    .reduce((a, b) => a + b, 0)}
                                onCheckout={()=>{
                                    if(shoppingCartItems.length <= 0){
                                        return
                                    }
                                    dispatch(checkout(jwt))
                                    navigate("/placeOrder");
                                }}
                                onShoppingCartClear={()=>{
                                    dispatch(clearShoppingCartItem({jwt, itemIds: shoppingCartItems.map(s=>s.id)}))
                                }} />
                            购物车
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    )
}