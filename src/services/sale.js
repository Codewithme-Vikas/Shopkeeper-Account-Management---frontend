import toast from "react-hot-toast";

import { buyOrdersNo, sellOrdersNo } from "../slices/data";
import { apiConnector } from "../utils/apiConnector"

import { GET_ALL_BUY_ORDERS, GET_ALL_SELL_ORDERS,GET_ORDER } from "../utils/APIs";


export function totalNoOfOrders(){
    return async (dispatch)=>{
        try {
            const {allBuyOrders} = await apiConnector(GET_ALL_BUY_ORDERS);
            const {allSellOrders} = await apiConnector(GET_ALL_SELL_ORDERS);
            
            const totalBuyOrders = allBuyOrders.length;
            const totalSellOrders = allSellOrders.length;

            dispatch( buyOrdersNo(totalBuyOrders) )
            dispatch( sellOrdersNo(totalSellOrders) )
            
            localStorage.setItem("totalBuyOrders", JSON.stringify(totalBuyOrders));
            localStorage.setItem("totalSellOrders", JSON.stringify(totalSellOrders))

        } catch (error) {
            console.log("GET ORDERS no. API ERROR..........", error)
            toast.error(error.message)
        }
    }
};


// I put here because it used by two components - View and Edit sale
export async function fetchSale( orderId, setSaleData){
    try {
        const { orderDoc } = await apiConnector( GET_ORDER + orderId);
        setSaleData( orderDoc );
        return orderDoc;
    } catch (error) {
        console.log("GET ORDER, API ERROR............", error)
        toast.error(error.message)
    }
}