import React from "react";
import styles from './placeOrder.module.css'
import { PaymentForm, CheckOutCard } from "../../components";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col } from 'antd'
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { placeOrder } from "../../redux/order/slice";

export const PlaceOrder: React.FC = (props) =>{

    const jwt = useSelector(s => s.user.token) as string
    const loading = useSelector(s => s.order.loading)
    const order = useSelector(s => s.order.currentOrder)
    const dispatch = useAppDispatch()

    return(
        <MainLayout>
            <Row>
                <Col span={12}>
                    <PaymentForm />
                </Col>
                <Col span={12}>
                    <CheckOutCard 
                    loading = {loading}
                    order = {order}
                    onCheckout={()=>{
                        dispatch(placeOrder({jwt, orderId: order.id}))
                    }}/>
                </Col>
            </Row>
        </MainLayout>
    );
};