import {configureStore} from '@reduxjs/toolkit'
import autSlice from "./features/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: autSlice
    },
})