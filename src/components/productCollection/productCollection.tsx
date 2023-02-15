import React from "react";
import styles from './productCollection.module.css';
import {Row, Col, Typography, Divider} from 'antd'

interface PropsType{
    title: JSX.Element; //title表示可以接受传入一个React组件
    sideImage: string;
    products: any[];
}

export const ProductCollection: React.FC<PropsType> = ({title, sideImage, products}) => {
    return(
        <div className={styles.content}>
            <Divider orientation="left">{title}</Divider>
            <Row>
                {/* 5:1 的比例*/}
                <Col span={4}>
                    <img src ={sideImage} className={styles["side-image"]} alt=""/>
                </Col>
                <Col span={20}>
                    
                </Col>
            </Row>
        </div>
    )
}