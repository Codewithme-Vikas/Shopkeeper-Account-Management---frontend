import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { Button, TextField,  Box } from '@mui/material'
import { apiConnector } from '../../utils/apiConnector'
import { CREATE_CUSTOMER } from '../../utils/APIs';
import { fetchCustomers } from '../../services/customer';

const CustomerForm = () => {

    const dispatch = useDispatch();

    async function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const customerObj = Object.fromEntries(formData);

        try {
            await apiConnector(CREATE_CUSTOMER, 'POST', customerObj);
            e.target.reset();  // reset the values of inputs
            toast.success('Add new Customer')
            dispatch(fetchCustomers());

        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <form onSubmit={submitHandler} className='p-8 w-full'>

            <Box sx={{display : 'flex' , gap : '1rem', flexDirection : 'column'}}>

                {/* name and mobiel no. */}
                <Box sx={{ display: 'flex', gap: '16px' }}>
                    <TextField fullWidth id="name" required name='name' label="Customer Name" type='text' />
                    <TextField fullWidth id="phone" required name='phone' label="Mobile No." type="text" />
                </Box>

                {/* address and email */}
                <Box sx={{ display: 'flex', gap: '16px' }}>
                    <TextField fullWidth id="address" name='address' label="Address" type='text' />
                    <TextField fullWidth id="email" name='email' label="Email" type="email" />
                </Box>

                {/* gst no. and pan no */}
                <Box sx={{ display: 'flex', gap: '16px' }}>
                    <TextField fullWidth id="GSTNumber" name='GSTNumber' label="GST No." type='text' />
                    <TextField fullWidth id="PAN" name='PAN' label="PAN No." type="text" />
                </Box>


                <div>
                    <Button variant="contained" type='submit'>Submit</Button>

                </div>

            </Box>

        </form>
    )
};

export default CustomerForm;