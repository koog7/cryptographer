import {configureStore} from "@reduxjs/toolkit";
import {CryptoReducer} from "../containers/ThunkFetch/FetchSlice.ts";

export const store = configureStore({
    reducer:{
        crypto: CryptoReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;