import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { Box, FormControl, Typography, Modal, Button, TextField, InputLabel, Select, MenuItem, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

import { apiConnector } from '../../utils/apiConnector'
import { GET_PRODUCT, UPDATE_PRODUCT } from '../../utils/APIs';
import { units } from '../../utils/constants';
import { fetchProducts } from '../../services/product';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};


export default function EditProductModel({ productId }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton color='primary' onClick={handleOpen}>
                <EditIcon />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="div" sx={style} >

                    <Typography sx={{margin : '12px 0', fontSize : '1.2rem'}}>Edit Product</Typography>

                    <EditCustomerForm productId={productId} setOpen={setOpen} />

                </Box>
            </Modal>
        </div>
    );
}



const EditCustomerForm = ({ productId, setOpen }) => {

    const dispatch = useDispatch();

    const [productName, setProductname] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');


    async function submitHandler(e) {
        e.preventDefault();
        try {
            const productObj = { id : productId, productName,unit, price };

            await apiConnector(UPDATE_PRODUCT, 'PUT', productObj);
            toast.success('Update Product')
            setOpen(false);
            dispatch(fetchProducts());

        } catch (error) {
            toast.error(error.message)
        }
    };

    async function fetchProduct() {
        try {
            const { productDoc } = await apiConnector(GET_PRODUCT + productId);
            setProductname(productDoc?.productName)
            setUnit(productDoc?.unit)
            setPrice(productDoc?.price)
            
        } catch (error) {
            // Handle the error at the appropriate level in your application
            toast.error(error.message);
            console.log('Error fetching product:', error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <form onSubmit={submitHandler} className='p-8 w-full  flex flex-col gap-4'>

        <Box sx={{display : 'flex', gap : '16px', flexDirection : 'column'}}>
            <div>
                <TextField
                    fullWidth
                    type='text'
                    id="productName"
                    label="Product Name"
                    name='productName'
                    required
                    value={productName}
                    onChange={(e) => setProductname(e.target.value)}
                />
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
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        {
                            units.map((unit, index) => {
                                return <MenuItem key={index} value={unit}>{unit}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </div>


            <div>
                <TextField
                    fullWidth
                    type='Number'
                    id="price"
                    name='price'
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

            </div>


            <div>
                <Button variant="contained" type='submit'>Add </Button>

            </div>

            </Box>

        </form>
    )
}