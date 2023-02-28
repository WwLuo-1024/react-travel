import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface userState {
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: userState = {
    loading: false,
    error: null,
    token: null
}

export const signIn = createAsyncThunk(
    "user/signIn",
    async (parameters: {
        email: string,
        password: string
    }, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`,{
            email: parameters.email,
            password:parameters.password
        });
        return data.token; //返回Promise
    }
)

export const userSlice = createSlice({
    name: "user", //命名空间
    initialState,
    reducers: {
        logOut: (state)=>{
            state.token = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers:{
        [signIn.pending.type]: (state) => {
            // return {...state, loading: true}; //通过展开操作符 利用state中的旧数据 创建一个全新的state对象 并且更新loading值 遵守了纯函数和immutable
            state.loading = true; //immer处理方式 减少设计模式
        },
        [signIn.fulfilled.type]: (state, action) => {
            state.token = action.payload;
            state.loading = false; //请求结束
            state.error = null;
        },
        [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})