import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import SaleList from "../sale/SaleList"
import { apiConnector } from "../../utils/apiConnector";
import { GET_ALL_ORDERS } from "../../utils/APIs";
import { customFilter } from "../../utils/helper";

const SaleReport = () => {

    const [salesData, setSalesData] = useState([]);
    // for extract the path
    const location = useLocation();
    const arr = location.pathname.split("/");
    const path = arr[arr.length - 1];



    const data = salesData.filter(customFilter('type', path === 'sale' ? 'Sell' : 'Buy'));
    const title = path === 'sale' ? 'Sell' : 'Purchase';

    async function fetchSales() {
        try {
            const { allOrders } = await apiConnector(GET_ALL_ORDERS);
            setSalesData(allOrders);
        } catch (error) {
            console.log("GET SALES DATA, API ERROR............", error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchSales();
    }, []);

    return (
        <div>

            <SaleList salesData={data} title={title} />
        </div>
    )
}

export default SaleReport