import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../../axios/AxiosAPI.ts";

interface Crypto {
    encodeMessage: string;
    decodeMessage: string;
    loading: boolean;
    error: boolean;
}

const initialState: Crypto = {
    encodeMessage: '',
    decodeMessage: '',
    loading: false,
    error: false,
};

export const encodePost = createAsyncThunk<string, { password: string; encode: string }>(
    'crypto/encodePost',
    async ({ password, encode } ) => {
        try {
            const response = await axiosAPI.post<{ cipherText: string }>('/encode', {
                password,
                encode,
            });
            console.log('encode' , response.data.encodeText)
            return response.data.encodeText;
        } catch (error) {
            return error.message;
        }
    }
);

export const decodePost = createAsyncThunk<string, { password: string; decode: string }>(
    'crypto/decodePost',
    async ({ password, decode } ) => {
        try {
            const response = await axiosAPI.post<{ decodedText: string }>('/decode', {
                password,
                decode,
            });
            return response.data.decodedText;
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
                state.encodeMessage = action.payload;
            })
            .addCase(encodePost.rejected, (state:Crypto) => {
                state.loading = false;
                state.error = true;
            }).addCase(decodePost.pending, (state:Crypto) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(decodePost.fulfilled, (state:Crypto, action: PayloadAction<string>) => {
                state.loading = false;
                state.error = false;
                state.decodeMessage = action.payload;
            })
            .addCase(decodePost.rejected, (state:Crypto) => {
                state.loading = false;
                state.error = true;
            });
    },
});


export const CryptoReducer = cryptoSlice.reducer;