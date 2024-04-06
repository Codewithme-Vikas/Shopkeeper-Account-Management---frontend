import { useState } from 'react'
import toast from 'react-hot-toast';

import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material'

import { units } from '../../utils/constants';
import { apiConnector } from '../../utils/apiConnector'
import { CREATE_PRODUCT } from '../../utils/APIs';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../services/product';

const ProductForm = () => {

    const dispatch = useDispatch();

    async function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = Object.fromEntries(formData);

        try {
            await apiConnector(CREATE_PRODUCT, 'POST', obj);
            e.target.reset();  // reset the values of inputs
            dispatch(fetchProducts())
            toast.success('Add new Product')

        } catch (error) {
            toast.error(error.message)
        }

    };

    return (
        <form onSubmit={submitHandler} className='p-8 w-full  flex flex-col gap-4'>

            <div className='flex gap-4'>
                <TextField fullWidth id="productName" name='productName' required label="Product Name" type='text' />
            </div>

            {/* unit option */}
            <div>
                <FormControl fullWidth>
                    <InputLabel id="unitLabel" className='mb-2'>Unit *</InputLabel>
                    <Select
                        labelId="unitLabel"
                        label="Unit"
                        id="unit"
                        required
                        name='unit'
                        defaultValue={''}
                    >
                        {
                            units.map((unit, index) => {
                                return <MenuItem key={index} value={unit}>{unit}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </div>


            <div className='flex gap-4'>
                <TextField fullWidth id="price" name='price' label="Price" type='Number' />

            </div>


            <div>
                <Button variant="contained" type='submit'>Add </Button>

            </div>

        </form>
    )
};

export default ProductForm