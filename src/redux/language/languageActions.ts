export const CHANGE_LANGUAGE = 'change_language';
export const ADD_LANGUAGE = 'add_language';

//8.7---定义强类型 避免Reducer中拼写错误
interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE;
    payload: "zh" | "en";
  }
  

interface AddLanguageAction{
    type: typeof ADD_LANGUAGE,
    payload:{name: string, code: string}
}
//---

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageActionCreater = (
    languageCode
    ):ChangeLanguageAction=>{ //接受字符串类型的参数
    return{
        type:CHANGE_LANGUAGE,
        payload:languageCode,
    };
}

export const addLanguageCreater = (name: string, code:string): AddLanguageAction =>{
    return{
        type:ADD_LANGUAGE,
        payload:{name, code}
    };
}