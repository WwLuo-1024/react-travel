export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START"; //API call start
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; //API call successful
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL"; //API call fail

interface FetchRecommendProductsStartAction{
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}
interface FetchRecommendProductsSuccessAction{
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any, //Data returned after a successful call
}
interface FetchRecommendProductsFailAction{
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any,
}

export type RecommendProductAction = FetchRecommendProductsStartAction 
                                    | FetchRecommendProductsSuccessAction 
                                    | FetchRecommendProductsFailAction

export const fetchRecommendProductStartActionCreater = (): FetchRecommendProductsStartAction =>{
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START,
    }
};

export const fetchRecommendProductSuccessActionCreater = (data):FetchRecommendProductsSuccessAction =>{
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
};

export const fetchRecommendProductFailActionCreater = (error): FetchRecommendProductsFailAction =>{
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
};