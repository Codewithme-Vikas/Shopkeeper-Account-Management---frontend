import { configureStore } from "@reduxjs/toolkit";

import authSlice from './auth';
import dataSlice from './data'

const store = configureStore({
    reducer : {
        auth : authSlice,
        data : dataSlice,
    }
});

export default store;