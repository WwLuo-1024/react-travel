import { ThunkAction } from "redux-thunk/es/types";
import { RootState } from "../store";
import axios from 'axios'

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

export const giveMeDataActionCreater = ():ThunkAction<
void, RootState, undefined, RecommendProductAction
> =>async (dispatch, getState) =>{
    dispatch(fetchRecommendProductStartActionCreater())
    try{
      const {data} = await axios.get("http://123.56.149.216:8080/api/productCollections" //axios.get本身是Promise
      );
    dispatch(fetchRecommendProductSuccessActionCreater(data))
    }catch(error){
      if(error instanceof Error){
    dispatch(fetchRecommendProductFailActionCreater(error.message))
      }
    }
}//void 没有任何数据的输出 函数
