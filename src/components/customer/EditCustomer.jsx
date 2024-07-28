import { useEffect, useState } from 'react'

import { Box, Typography, Modal, Button, TextField, InputLabel, Select, MenuItem, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

import { apiConnector } from '../../utils/apiConnector'
import { GET_CUSTOMER, UPDATE_CUSTOMER } from '../../utils/APIs';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { fetchCustomers } from '../../services/customer';

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


export default function EditCustomerModel({ customerId }) {
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

                    <Typography>Edit Customer</Typography>

                    <EditCustomerForm customerId={customerId} setOpen={setOpen} />

                </Box>
            </Modal>
        </div>
    );
}



const EditCustomerForm = ({ customerId, setOpen }) => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [GSTNumber, setGSTNumber] = useState('');
    const [PAN, setPAN] = useState('');

    async function submitHandler(e) {
        e.preventDefault();
        try {
            const customerObj = { customerId, name, phone, email, address, GSTNumber, PAN };

            await apiConnector(UPDATE_CUSTOMER, 'POST', customerObj);
            toast.success('Update Customer')
            setOpen(false);
            dispatch(fetchCustomers());

        } catch (error) {
            toast.error(error.message)
        }
    };

    async function fetchCustomer() {
        try {
            const { customerDoc } = await apiConnector(GET_CUSTOMER + customerId, 'GET');
            setName(customerDoc?.name)
            setPhone(customerDoc?.phone)
            setAddress(customerDoc?.address)
            setEmail(customerDoc?.email)
            setGSTNumber(customerDoc?.GSTNumber)
            setPAN(customerDoc?.PAN);
        } catch (error) {
            // Handle the error at the appropriate level in your application
            toast.error(error.message);
            console.log('Error fetching customers:', error);
        }
    }

    useEffect(() => {
        fetchCustomer();
    }, [])

    return (
        <form onSubmit={submitHandler}>

            <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* name and mobiel no. */}
                <Box sx={{ display: 'flex', gap: '16px' }} >
                    <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth id="name" required name='name' label="Customer Name" type='text' />
                    <TextField value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth id="phone" required name='phone' label="Mobile No." type="text" />
                </Box>

                {/* address and email */}
                <Box sx={{ display: 'flex', gap: '16px' }}>
                    <TextField value={address} onChange={(e) => setAddress(e.target.value)} fullWidth id="address" name='address' label="Address" type='text' />
                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth id="email" name='email' label="Email" type="email" />
                </Box>

                {/* gst no. and pan no */}
                <Box sx={{ display: 'flex', gap: '16px' }}>
                    <TextField value={GSTNumber} onChange={(e) => setGSTNumber(e.target.value)} fullWidth id="GSTNumber" name='GSTNumber' label="GST No." type='text' />
                    <TextField value={PAN} onChange={(e) => setPAN(e.target.value)} fullWidth id="PAN" name='PAN' label="PAN No." type="text" />
                </Box>


                <div>
                    <Button variant="contained" type='submit'>Submit</Button>
                </div>

            </Box>
        </form>
    )
}