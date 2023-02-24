import { FETCH_RECOMMEND_PRODUCTS_FAIL, FETCH_RECOMMEND_PRODUCTS_START, FETCH_RECOMMEND_PRODUCTS_SUCCESS, RecommendProductAction } from "./recommendProductsActions"

interface RecommendProductsState{
    productList: any[],
    loading: boolean,
    error: string | null,
}

const defaultState: RecommendProductsState = { //To set the default data of RecommendProducts
    loading: true,
    error: null,
    productList: [],
}   

export default (state = defaultState, action: RecommendProductAction) => { //reducer fucntion to require old state and action
    switch(action.type) {
        case FETCH_RECOMMEND_PRODUCTS_START:
            return{...state, loading: true}; //三点展开其余保持不变 只针对loading变化
        case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
            return{...state, loading:false, productList: action.payload};
        case FETCH_RECOMMEND_PRODUCTS_FAIL:
            return{...state, loading:false, error:action.payload};
        default:
            return state
    }


    return state;
}

