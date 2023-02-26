import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSearchState {
    loading: boolean;
    error: string | null;
    data: any;
    pagination: any;
}

const initialState: ProductSearchState = {
    loading: true,
    error: null,
    data: null,
    pagination: null
}

export const searchProduct = createAsyncThunk(
    "productSearch/searchProduct",
    async (parameters: {
        keywords: string | null,
        nextPage: number | string,
        pageSize: number | string,
    }, thunkAPI) => {
        let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${parameters.nextPage}&pageSize=${parameters.pageSize}`
        if (parameters.keywords) {
            url += `&keyword=${parameters.keywords}`;
        }
        const response = await axios.get(url)
        return {
            data: response.data,
            pagination: JSON.parse(response.headers["x-pagination"]) //由于headers中保存该数据为字符串形式 因此需要json.pass把字符串转换为js对象
        };
    }
)

export const productSearchSlice = createSlice({
    name: "productSearch",
    initialState,
    reducers: {

    },
    extraReducers: {
        [searchProduct.pending.type]: (state) => { //开始请求
            state.loading = true;
        },
        [searchProduct.fulfilled.type]: (state, action) => { //请求成功
            state.data = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
        },
        [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => { //请求失败
            state.loading = false;
            state.error = action.payload;
        }

    }
})