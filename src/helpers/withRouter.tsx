import React from "react";
import { useNavigate, NavigateFunction} from "react-router-dom";

export interface RouterComponentProps{
    navigate: NavigateFunction;
}

export const withRouter = (Component) =>{ //Component是将要被包裹的组件
    const Wrapper = (props) =>{
        const navigate = useNavigate()
        return <Component navigate = {navigate} {...props} />
    }

    return Wrapper;
}