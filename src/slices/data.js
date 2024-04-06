import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'customer',
    initialState: {
        customers: [],
        products: [],
        totalSellOrders: localStorage.getItem('totalSellOrders') ? JSON.parse(localStorage.getItem('totalSellOrders')) : 0,
        totalBuyOrders: localStorage.getItem('totalBuyOrders') ? JSON.parse(localStorage.getItem('totalBuyOrders')) : 0,
    },
    reducers: {
        addCustomers: (state, action) => {
            state.customers = action.payload
        },
        addProducts: (state, action) => {
            state.products = action.payload
        },
        buyOrdersNo: (state, action) => {
            state.totalBuyOrders = action.payload
        },
        sellOrdersNo: (state, action) => {
            state.totalSellOrders = action.payload
        },
        increaseBuyOrders: (state) => {
            state.totalBuyOrders = state.totalBuyOrders + 1;
        },
        increaseSellOrders: (state) => {
            state.totalSellOrders = state.totalSellOrders + 1;
        },
    }
});

export const { addCustomers, addProducts, buyOrdersNo, sellOrdersNo, increaseBuyOrders,increaseSellOrders } = dataSlice.actions;
export default dataSlice.reducer;