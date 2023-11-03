import {configureStore} from '@reduxjs/toolkit'
import autSlice from "./features/auth/authSlice";
import postSlice from "./features/post/postSlice";

export const store = configureStore({
    reducer: {
        auth: autSlice,
        post: postSlice
    },
})