import React from "react";
import styles from './detailPage.module.css'
import { useParams } from 'react-router-dom'

export const DetailPage: React.FC = () =>{

    //针对多参数传入 构建一下type
    type MatchParams = {
        touristRouteId: string,
        other: string
    }
    //大部分情况 type和interface互换 用于定义参数类型
    //但有特殊情况只能使用type 如：如果需要对某个类型重命名定义
    interface MatchParams2{
        touristRouteId: string,
        other: string
    }

    // var params = useParams<"touristRouteId">() 
    var params = useParams<MatchParams>()
    return(
        <h1>旅游路线详情页, 路线id:{params.touristRouteId}{params.other}</h1>
    )
}