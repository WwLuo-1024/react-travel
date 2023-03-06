import React from "react";
import styles from './placeOrder.module.css'
import { PaymentForm, CheckOutCard } from "../../components";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col } from 'antd'

export const PlaceOrder: React.FC = (props) =>{
    return(
        <MainLayout>
            <Row>
                <Col span={12}>
                    <PaymentForm />
                </Col>
                <Col span={12}>
                    {/* <CheckOutCard /> */}
                </Col>
            </Row>
        </MainLayout>
    )
}