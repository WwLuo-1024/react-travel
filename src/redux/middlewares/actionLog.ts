import { Middleware } from "redux"


export const actionLog : Middleware = (store) => (next) => (action) =>{
    console.log("state 当前", store.getState());
    console.log("fire action", action);
    next(action) //action分发 实际就是第二个嵌套函数传入的dispatch函数
    console.log("state 更新", store.getState())
}