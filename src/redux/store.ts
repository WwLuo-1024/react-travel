import { createStore, combineReducers, applyMiddleware } from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from 'redux-thunk'


const rootReducer = combineReducers({ //The combination root reducer
    language: languageReducer,
    recommendProducts: recommendProductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>

export default store;