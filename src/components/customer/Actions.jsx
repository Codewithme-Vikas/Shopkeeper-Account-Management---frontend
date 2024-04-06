import React from 'react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { IconButton } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview';
import DeleteIcon from '@mui/icons-material/Delete';

import EditCustomerModel from './EditCustomer';
import { apiConnector } from '../../utils/apiConnector';
import { DELETE_CUSTOMER } from '../../utils/APIs';
import { useDispatch } from 'react-redux';
import { fetchCustomers } from '../../services/customer';


const Actions = ({ id }) => {

    const dispatch = useDispatch();

    async function deleteCustomer() {
        try {
            const data = await apiConnector( DELETE_CUSTOMER + id, 'GET' );
            toast.success(data.message)
            dispatch(fetchCustomers());
        } catch (error) {
            toast.error( error.message)
        }
    }


    return (
        <div className='flex gap-1'>

            <div>
                <Link to={`/customer/${id}`}>
                    <IconButton className='text-green-800'>
                        <RateReviewIcon />
                    </IconButton>
                </Link>
            </div>

            <div>
                <EditCustomerModel customerId={id}/>
            </div>

            <div>
                <IconButton aria-label="delete" className='text-red-600' onClick={deleteCustomer}>
                    <DeleteIcon />
                </IconButton>
            </div>

        </div>
    )
}

export default Actions