import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    items: any[];
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: []
}

export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: {jwt: string, touristRouteId: string}, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/items`,
        // 请求主体body
        {
            touristRouteId: parameters.touristRouteId
        },
    
        {
            headers:{
                Authorization: `bearer ${parameters.jwt}`
            }
        });
        return data.shoppingCartItems; //返回Promise
    }
)

export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.get(`http://123.56.149.216:8080/api/shoppingCart`,
        {
            headers:{
                Authorization: `bearer ${jwt}`
            }
        });
        return data.shoppingCartItems; //返回Promise
    }
)

export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters: {jwt: string, itemIds: number[]}, thunkAPI) => {
        return await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(',')})`,
        {
            headers:{
                Authorization: `bearer ${parameters.jwt}`
            }
        });
    }
)

export const checkout = createAsyncThunk(
    "shoppingCart/checkout",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/checkout`,
        {
            headers:{
                Authorization: `bearer ${jwt}`
            }
        });
        return data; //返回Promise
    }
)

export const shoppingCartSlice = createSlice({
    name: "shoppingCart", //命名空间
    initialState,
    //1. 此时reducer和action捆绑在一起了 不用再单独定义action
    //2. 此时recuder是一个对象而不是一个过程 每个对象对应着一个action 同时也对应着action的处理函数
    //3. 本身createSlice就是面对对象而不是面对过程的 所以不需要再使用switch语句
    reducers: {

    },
    extraReducers:{
        [getShoppingCart.pending.type]: (state) => {
            // return {...state, loading: true}; //通过展开操作符 利用state中的旧数据 创建一个全新的state对象 并且更新loading值 遵守了纯函数和immutable
            state.loading = true; //immer处理方式 减少设计模式
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false; //请求结束
            state.error = null;
        },
        [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },

        [addShoppingCartItem.pending.type]: (state) => {
            // return {...state, loading: true}; //通过展开操作符 利用state中的旧数据 创建一个全新的state对象 并且更新loading值 遵守了纯函数和immutable
            state.loading = true; //immer处理方式 减少设计模式
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false; //请求结束
            state.error = null;
        },
        [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },

        [clearShoppingCartItem.pending.type]: (state) => {
            // return {...state, loading: true}; //通过展开操作符 利用state中的旧数据 创建一个全新的state对象 并且更新loading值 遵守了纯函数和immutable
            state.loading = true; //immer处理方式 减少设计模式
        },
        [clearShoppingCartItem.fulfilled.type]: (state) => {
            state.items = [];
            state.loading = false; //请求结束
            state.error = null;
        },
        [clearShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },

        [checkout.pending.type]: (state) => {
            // return {...state, loading: true}; //通过展开操作符 利用state中的旧数据 创建一个全新的state对象 并且更新loading值 遵守了纯函数和immutable
            state.loading = true; //immer处理方式 减少设计模式
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.items = [];
            state.loading = false; //请求结束
            state.error = null;
        },
        [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})