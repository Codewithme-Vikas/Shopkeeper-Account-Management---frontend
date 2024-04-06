import React from 'react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { IconButton } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview';
import DeleteIcon from '@mui/icons-material/Delete';

// import EditCustomerModel from './EditCustomer';
import { apiConnector } from '../../utils/apiConnector';
import { DELETE_PRODUCT } from '../../utils/APIs';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../services/product';
import EditProductModel from './EditProductModel';


const ProductActions = ({ id }) => {

    const dispatch = useDispatch();

    async function deleteProduct() {
        try {
            const data = await apiConnector( DELETE_PRODUCT + id );
            toast.success(data.message)
            dispatch(fetchProducts());
        } catch (error) {
            toast.error( error.message)
        }
    };


    return (
        <div className='flex gap-1'>

            <div>
                <EditProductModel productId={id}/>
            </div>

            <div>
                <IconButton aria-label="delete" className='text-red-600' onClick={deleteProduct}>
                    <DeleteIcon />
                </IconButton>
            </div>

        </div>
    )
}

export default ProductActions;