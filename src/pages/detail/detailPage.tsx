import React, { useEffect } from "react";
import styles from './detailPage.module.css'
import { useParams } from 'react-router-dom'
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu, Button } from "antd";
import { ProductIntro, ProductComments } from "../../components";
import { commentMockData } from "./mockup";
import { getProductDetail } from "../../redux/productDetail/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layouts/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";
import { use } from "i18next";
// import { useDispatch } from "react-redux";

//针对多参数传入 构建一下type
type MatchParams = {
    touristRouteId: string,
}
//大部分情况 type和interface互换 用于定义参数类型
//但有特殊情况只能使用type 如：如果需要对某个类型重命名定义
interface MatchParams2 {
    touristRouteId: string,
    other: string
}

export const DetailPage: React.FC = () => {
    const { touristRouteId } = useParams<MatchParams>()
    // const [loading, setLoading] = useState<boolean>(true)
    // const [product, setProduct] = useState<any>(null)
    // const [error, setError] = useState<string | null>(null)
    const { RangePicker } = DatePicker;


    //状态转移到redux中
    const loading = useSelector(state => state.productDetail.loading)
    const error = useSelector(state => state.productDetail.error)
    const product = useSelector(state => state.productDetail.data)

    const dispatch = useAppDispatch()

    const jwt = useSelector(s=>s.user.token) as string
    const shoppingCartLoading = useSelector(s=>s.shoppingCart.loading)

    useEffect(() => {
        // const fetchData = async () => {

        // };
        // fetchData()
        if (touristRouteId) {
            dispatch(getProductDetail(touristRouteId)) //需要创建自定义dispatch hook
        }
    }, []) //页面初始化数据只调用一次，第二个参数为空数组

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%"
                }} />
        );
    }
    if (error) {
        return <div>网站出错: </div>
    }

    return (
        <MainLayout>
            {/* <Header /> */}
            {/* <div className={styles["page-content"]}> */}
                {/* 产品简介 与 日期选择 */}
                <div className={styles["product-intro-container"]}>
                    <Row>
                        <Col span={13}>
                            <ProductIntro
                                title={product.title}
                                shortDescription={product.description}
                                price={product.originalPrice}
                                coupons={product.coupons}
                                points={product.points}
                                discount={product.price}
                                rating={product.rating}
                                pictures={product.touristRoutePictures.map((p => p.url))}
                            />
                        </Col>
                        <Col span={11}>
                            <Button style={{marginTop:50, marginBottom:30, display:'block'}}
                            type = "primary"
                            danger
                            loading = {shoppingCartLoading}
                            onClick={()=>{
                                dispatch(addShoppingCartItem({jwt, touristRouteId:product.id}))
                            }}>
                                {/* type意味有边框 */}
                                <ShoppingCartOutlined />
                                放入购物车
                            </Button>
                            <RangePicker open style={{ marginTop: 20 }} />
                        </Col>
                    </Row>
                </div>
                {/* 锚点菜单 */}
                <Anchor className={styles["product-detail-anchor"]}>
                    <Menu mode="horizontal">
                        <Menu.Item key="1">
                            <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Anchor.Link href="#fees" title="费用"></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
                        </Menu.Item>
                    </Menu>
                </Anchor>
                {/* 产品特色 */}
                <div id="feature" className={styles["product-detail-container"]}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>产品特色</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 160 }}></div>
                </div>
                {/* 费用 */}
                <div id="fees" className={styles["product-detail-container"]}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>产品费用</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 80 }}></div>
                </div>
                {/* 预订须知 */}
                <div id="notes" className={styles["product-detail-container"]}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>预订须知</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 80 }}></div>
                </div>
                {/* 商品评价 */}
                <div id="comments" className={styles["product-detail-container"]}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>商品评价</Typography.Title>
                    </Divider>
                    <div style={{ margin: 40 }}>
                        <ProductComments data={commentMockData} />
                    </div>
                </div>
            {/* </div> */}
            {/* <Footer /> */}
        </MainLayout>
    )
}