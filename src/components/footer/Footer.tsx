import React from "react";
import {Layout, Typography} from "antd" //title属于Typography子组件
import { useTranslation, withTranslation } from 'react-i18next'

export const Footer:React.FC = () =>{

  const { t } = useTranslation();
    return(
        <Layout.Footer style={{textAlign:'center'}}>
        <Typography.Title level={3} style={{textAlign:'center', display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"-0.5em"}}>
          {t("footer.detail")}
        </Typography.Title>
      </Layout.Footer>
    )
}