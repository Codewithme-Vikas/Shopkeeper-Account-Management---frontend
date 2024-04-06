import toast from "react-hot-toast";

import { apiConnector } from "../utils/apiConnector";
import {  GET_ALL_PRODUCTS } from "../utils/APIs";
import { addProducts } from "../slices/data";

export function fetchProducts() {
    return async (dispatch) => {

        const toastId = toast.loading("fetching products...");

        try {
            const { allProductsDoc } = await apiConnector(GET_ALL_PRODUCTS);
            dispatch(addProducts(allProductsDoc))

        } catch (error) {
            console.log("GET all products API ERROR..........", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId);
    }
}