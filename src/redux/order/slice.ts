import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkout } from "../shoppingCart/slice";

interface orderState {
    loading: boolean;
    error: string | null;
    currentOrder: any;
}

const initialState: orderState = {
    loading: true,
    error: null,
    currentOrder: null
}

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (parameter:{jwt: string, orderId: string}, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/api/orders/${parameter.orderId}/placeOrder`,
            null, {
                headers:{
                    Authorization: `bearer ${parameter.jwt}` 
                },
            });
        return data; //返回Promise
    }
)

export const orderSlice = createSlice({
    name: "order", //命名空间
    initialState,
    //1. 此时reducer和action捆绑在一起了 不用再单独定义action
    //2. 此时recuder是一个对象而不是一个过程 每个对象对应着一个action 同时也对应着action的处理函数
    //3. 本身createSlice就是面对对象而不是面对过程的 所以不需要再使用switch语句
    reducers: {

    },
    extraReducers:{
        [placeOrder.pending.type]: (state) => {
            // return {...state, loading: true}; //通过展开操作符 利用state中的旧数据 创建一个全新的state对象 并且更新loading值 遵守了纯函数和immutable
            state.loading = true; //immer处理方式 减少设计模式
        },
        [placeOrder.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload;
            state.loading = false; //请求结束
            state.error = null;
        },
        [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },

        [checkout.pending.type]: (state) => {
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload; //在购物车checkout时返回的订单数据传给currentOrder用于传入订单页面的订单数据
            state.loading = false; //请求结束
            state.error = null;
        },
        [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})