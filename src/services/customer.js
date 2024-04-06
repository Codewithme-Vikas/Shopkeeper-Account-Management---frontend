import toast from "react-hot-toast";

import { apiConnector } from "../utils/apiConnector";
import { GET_ALL_CUSTOMERS } from "../utils/APIs";
import { addCustomers } from "../slices/data";

export function fetchCustomers() {
    return async (dispatch) => {

        const toastId = toast.loading("Loading...")

        try {
            const { allCustomersDoc } = await apiConnector(GET_ALL_CUSTOMERS);
            dispatch(addCustomers(allCustomersDoc));

        } catch (error) {
            console.log("GET all customer API ERROR............", error)
            toast.error(error.message)
        }

        toast.dismiss(toastId)
    }
};
