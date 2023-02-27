import React from "react";
import styles from './mainLayout.module.css'
import { Footer, Header } from "../../components";

{/* 需要定义children类型并在下方定义泛型 否则报错 */}
interface PropsType{
    children: React.ReactNode
}

export const MainLayout: React.FC<PropsType> = ({children}) =>{
    return(
        <>
            <Header />
            <div className = {styles["page-content"]}>
                {children}
            </div>
            <Footer />
        </>
    )
}