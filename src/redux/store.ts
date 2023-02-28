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


const rootReducer = combineReducers({ //The combination root reducer
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer
})

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog, changeLanguage));
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog, changeLanguage, thunk),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch; //10.7
export default store;