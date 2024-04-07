import { useEffect, useState } from "react"
import toast from 'react-hot-toast';
import SaleList from "../sale/SaleList"
import { apiConnector } from "../../utils/apiConnector";
import { GET_ALL_SELL_ORDERS } from "../../utils/APIs";

const SaleReport = () => {

    const [ salesData, setSalesData ] = useState([]);


    async function fetchSales(){
        try {
            const {allSellOrders} = await apiConnector(GET_ALL_SELL_ORDERS);
            setSalesData(allSellOrders);
        } catch (error) {
            console.log("GET SALES DATA, API ERROR............", error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchSales();
    },[])

    return (
        <div>

            <SaleList salesData={salesData}/>
        </div>
    )
}

export default SaleReport