import { act } from "react-dom/test-utils";

export interface languageState{
    language: "en" | "zh",
    languageList: {name: string, code: string}[];
}

const defaultState: languageState = {
    language: "zh",
    languageList: [
        {name: "中文", code: "zh"},
        {name: "English", code:"en"},
    ],
};

export default (state = defaultState, action) =>{
    console.log(state, action)
    if(action.type === "change_language"){
        const newState = {...state, language:action.payload} //根据redux规则 数据state是immutable 需要创建新对象来处理
        //其中...为展开运算符
        return newState;
    }
    return state;
}