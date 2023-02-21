import { act } from "react-dom/test-utils";
import i18n from "i18next";
import { CHANGE_LANGUAGE,  ADD_LANGUAGE, LanguageActionTypes} from "./languageActions";


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

export default (state = defaultState, action: LanguageActionTypes) =>{
    console.log(state, action)
    switch(action.type){
        case CHANGE_LANGUAGE: //建立敞亮 避免字符串打字出现错误
            i18n.changeLanguage(action.payload); //这样处理不标准 有副作用非纯函数
            return {...state, language:action.payload} //根据redux规则 数据state是immutable 需要创建新对象来处理
            //其中...为展开运算符
        case ADD_LANGUAGE:
            return {...state, languageList: [...state.languageList, action.payload]}
        default: 
            return state
    }
}