import React from "react";
import styles from "./SideMenu.module.css";
import {sideMenuList} from './mockup';
import { Menu } from "antd";
import { GifOutlined } from "@ant-design/icons";

export const SideMenu: React.FC = () =>{
    return(
        <Menu mode={'vertical'} className={styles["side-menu"]} 
        items = {sideMenuList.map((m) =>({
        label:m.title, 
        icon:<GifOutlined/>,
        key: m.title,
            children:m.subMenu.map((sm)=>({
            label:sm.title, 
            icon:<GifOutlined/>,
            key: sm.title,
                children:m.subMenu.map((sms)=>({
                label:sms.title, 
                icon:<GifOutlined/>,
                key: sms.title,
                })),
             })),
        }))}
        ></Menu>
    )
}