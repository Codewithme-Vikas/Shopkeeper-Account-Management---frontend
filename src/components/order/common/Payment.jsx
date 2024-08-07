import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material'

import { fetchCustomers, fetchCustomerCredit } from '../../../services/customer';
import { customSort } from '../../../utils/helper';
import { apiConnector } from '../../../utils/apiConnector';
import { CREATE_PAYMENT } from '../../../utils/APIs';

const Payment = ({type}) => {
    

    const customers = useSelector(store => store.data.customers);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // always create a copy of actual RTK state to manipulate it. [ can't directly manipulate]
    const customerList = [...customers].sort(customSort('name'))

    // to show user balance/credit <-- inhance User experience
    const [balance, setBalance] = useState('');
    
    // **************** Payment data ******************
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');



    async function paymentHandler() {

        // Frontend checks --> for user better expreience
        if (!selectedCustomer) {
            return toast.error("Select Customer.")
        } else if (amount <= 0) {
            return toast.error("Amount can't be 0 or less.")
        }


        // Data for API
        const paymentData = {
            type : type ,
            amount,
            note,
            customer: {
                name: selectedCustomer?.name,
                phone: selectedCustomer?.phone,
            },
            customerId: selectedCustomer?._id
        }

        try {
            await apiConnector(CREATE_PAYMENT, 'POST', paymentData);
            toast.success(`${ type } successfully!`);

            resetStates();

        } catch (error) {
            console.log('CREATE PAYMENT! API ERROR.............', error);
            toast.error(error.message);
        }
    }

    function resetStates(){
        setBalance('');
        setSelectedCustomer('');
        setAmount(0);
        setNote('');
    }


    useEffect(() => {
        dispatch(fetchCustomers());
    }, []);



    useEffect(() => {
        if (selectedCustomer) {
            fetchCustomerCredit(selectedCustomer._id, setBalance);
        }
    }, [selectedCustomer]);

    return (
        <div className='px-4'>

            <p className='text-3xl my-2 font-bold'>{type }</p>

            <div className='flex justify-between '>

                <div className='w-1/2 flex flex-col gap-6'>

                    {/* customer select options */}
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="customerLabel" className='mb-2'>Customer *</InputLabel>
                            <Select
                                labelId="customerLabel"
                                label="Customer"
                                id="customer"
                                required
                                value={selectedCustomer}
                                onChange={(e) => setSelectedCustomer(e.target.value)}
                                >
                                {
                                    customerList.map(customer => {
                                        return <MenuItem key={customer?._id} value={customer}>{customer?.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>

                    {/* amount and note */}
                    <div className='flex flex-col gap-2 items-start'>
                        <TextField fullWidth id="due" label="Due" type='text' value={balance} />
                        <TextField value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth id="amount" label="Amount" type='number' required />
                        <TextField value={note} onChange={(e) => setNote(e.target.value)} fullWidth id="note" label="Note" type='text' />
                    </div>


                    <div className='my-2 flex gap-4'>
                        <Button variant="contained" onClick={paymentHandler}>{type}</Button>
                        <Button variant="contained" onClick={() => navigate(-1)}>Go back</Button>
                    </div>

                </div>



            </div>

        </div>
    )
};

export default Payment;