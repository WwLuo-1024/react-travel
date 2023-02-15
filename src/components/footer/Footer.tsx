import React from "react";
import {Layout, Typography} from "antd" //title属于Typography子组件


export const Footer:React.FC = () =>{
    return(
        <Layout.Footer style={{textAlign:'center'}}>
        <Typography.Title level={3} style={{textAlign:'center', display:"flex", justifyContent:"center", alignItems:"center"}}>
          版权所有 @ React 旅游网
        </Typography.Title>
      </Layout.Footer>
    )
}