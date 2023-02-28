import { createStore, applyMiddleware } from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from 'redux-thunk';
import { actionLog } from "./middlewares/actionLog";
import { changeLanguage } from "./middlewares/changeLanguage";
import { productDetailSlice } from './productDetail/slice';
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { getDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { productSearchSlice } from "./productSearch/slice";
import { userSlice } from "./user/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"] //指向下方的redux中的root user 白名单只保存该数据 其他一概不保存(黑名单反之)
}

const rootReducer = combineReducers({ //The combination root reducer
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog, changeLanguage));
const store = configureStore({
    reducer: persistedReducer, //持久化后 需要将原来的rootReducer改为persistedReducer
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog, changeLanguage, thunk),
    devTools: true,
});

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch; //10.7
export default { store, persistor };