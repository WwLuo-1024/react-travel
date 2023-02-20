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
    switch(action.type){
        case "change_language":
            return {...state, language:action.payload} //根据redux规则 数据state是immutable 需要创建新对象来处理
            //其中...为展开运算符
        case "add_language":
            return {...state, languageList: [...state.languageList, action.payload]}
        default: 
            return state
    }
}