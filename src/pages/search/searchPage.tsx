import React from "react";
import styles from './searchPage.module.css'
import { Header, Footer, FilterArea, ProductList } from "../../components";

export const SearchPage: React.FC = () =>{
    return(
        <>
            <Header />
            <div className={styles["page-content"]}>
            {/* 分类过滤器 */}
            <div className={styles["product-list-container"]}>
                <FilterArea />
            </div>
            {/* 产品列表 */}
            <div className={styles["product-list-container"]}>
                <ProductList />
            </div>
            </div>
            <Footer />
        </>
    )
}