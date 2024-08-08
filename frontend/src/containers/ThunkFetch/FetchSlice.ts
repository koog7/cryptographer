import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../../axios/AxiosAPI.ts";

interface Crypto {
    encode: string;
    decode: string;
    loading: boolean;
    error: boolean;
}

const initialState: Crypto = {
    encode: '',
    decode: '',
    loading: false,
    error: false,
};

export const encodePost = createAsyncThunk<string, { password: string; encode: string }>(
    'crypto/sendPostRequest',
    async ({ password, encode } ) => {
        try {
            const response = await axiosAPI.post<{ cipherText: string }>('/encode', {
                password,
                encode,
            });
            return response.data.encodeText;
        } catch (error) {
            return error.message;
        }
    }
);

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(encodePost.pending, (state:Crypto) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(encodePost.fulfilled, (state:Crypto, action: PayloadAction<string>) => {
                state.loading = false;
                state.error = false;
                state.encode = action.payload;
            })
            .addCase(encodePost.rejected, (state:Crypto) => {
                state.loading = false;
                state.error = true;
            });
    },
});


export const CryptoReducer = cryptoSlice.reducer;