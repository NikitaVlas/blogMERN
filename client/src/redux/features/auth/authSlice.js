import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}

const autSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
})

export default autSlice.reducer