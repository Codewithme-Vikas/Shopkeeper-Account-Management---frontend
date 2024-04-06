import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
    }
});

export const { setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;