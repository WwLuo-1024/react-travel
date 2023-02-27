import React, { useEffect } from "react";
import styles from './searchPage.module.css'
import { Header, Footer, FilterArea, ProductList } from "../../components";
import { useParams, useLocation } from "react-router-dom"; //获取URL中的参数keyword
import { Spin } from "antd";
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks"; //useSelector连接redux中的State（分别获取loading，data，pagination， error）
import { MainLayout } from "../../layouts/mainLayout";

type MatchParams = {
    keywords: string
}

export const SearchPage: React.FC = () => {

    const { keywords } = useParams<MatchParams>();
    const loading = useSelector((state) => state.productSearch.loading);
    const error = useSelector((s) => s.productSearch.error);
    const pagination = useSelector((s) => s.productSearch.pagination);
    const productList = useSelector((s) => s.productSearch.data);

    const dispatch = useAppDispatch();

    const location = useLocation();

    useEffect(() => {
        if (keywords) {
            dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }))
        }
    }, [location])

    const onPageChange = (nextPage, pageSize) => {
        if (keywords) {
            dispatch(searchProduct({ nextPage, pageSize, keywords }))
        }
    }
    {/* 处理网络数据加载 */ }
    if (loading) {
        return <Spin
            size="large"
            style={{
                marginTop: 200,
                marginBottom: 200,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%"
            }} />
    }
    if (error) {
        return <div>网站出错:{error}</div>
    }

    return (
        <MainLayout>
            {/* <Header /> */}
            {/* <div className={styles["page-content"]}> */}
                {/* 分类过滤器 */}
                <div className={styles["product-list-container"]}>
                    <FilterArea />
                </div>
                {/* 产品列表 */}
                <div className={styles["product-list-container"]}>
                    <ProductList
                        data={productList}
                        paging={pagination}
                        onPageChange={onPageChange} //处理用户点击切换页面操作
                    />
                </div>
            {/* </div> */}
            {/* <Footer /> */}
        </MainLayout>
    )
}