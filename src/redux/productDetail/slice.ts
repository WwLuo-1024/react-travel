import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductDetailState{
    loading: boolean;
    error: string | null;
    data: any;
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null
}

export const productDetailSlice = createSlice({
    name: "productDetail", //命名空间
    initialState,
    //1. 此时reducer和action捆绑在一起了 不用再单独定义action
    //2. 此时recuder是一个对象而不是一个过程 每个对象对应着一个action 同时也对应着action的处理函数
    //3. 本身createSlice就是面对对象而不是面对过程的 所以不需要再使用switch语句
    reducers: {
        fetchStart: (state) => {
            // return {...state, loading: true}; //通过展开操作符 利用state中的旧数据 创建一个全新的state对象 并且更新loading值 遵守了纯函数和immutable
            state.loading = true; //immer处理方式 减少设计模式
        },
        fetchSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false; //请求结束
            state.error = null;
        },
        fetchFail: (state, action: PayloadAction<string|null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})