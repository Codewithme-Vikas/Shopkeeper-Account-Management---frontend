import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { Button, TextField, InputLabel, Select, MenuItem } from '@mui/material'
import { apiConnector } from '../../utils/apiConnector'
import { CREATE_CUSTOMER } from '../../utils/APIs';
import { fetchCustomers } from '../../services/customer';

const CustomerForm = () => {

    const [accountType, setAccountType] = useState('Buyer');
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
        <form onSubmit={submitHandler} className='p-8 w-full flex flex-col gap-4'>

            {/* name and mobiel no. */}
            <div className='flex gap-4'>
                <TextField fullWidth id="name" required name='name' label="Customer Name" type='text' />
                <TextField fullWidth id="phone" required name='phone' label="Mobile No." type="text" />
            </div>

            {/* address and email */}
            <div className='flex gap-4'>
                <TextField fullWidth id="address" name='address' label="Address" type='text' />
                <TextField fullWidth id="email" name='email' label="Email" type="email" />
            </div>

            {/* gst no. and pan no */}
            <div className='flex gap-4'>
                <TextField fullWidth id="GSTNumber" name='GSTNumber' label="GST No." type='text' />
                <TextField fullWidth id="PAN" name='PAN' label="PAN No." type="text" />
            </div>

            {/* account type - buyer or seller */}
            <div>
                <InputLabel id="accountTypeLabel" className='mb-2'>Customer Type</InputLabel>
                <Select
                    className='w-full'
                    labelId="accountTypeLabel"
                    id="demo-simple-select"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    required
                    name='accountType'
                >
                    <MenuItem value="Buyer">Buyer</MenuItem>
                    <MenuItem value="Seller">Seller</MenuItem>
                </Select>
            </div>

            <div>
                <Button variant="contained" type='submit'>Submit</Button>

            </div>

        </form>
    )
};

export default CustomerForm;