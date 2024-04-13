import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material'

import FormLogo from "../common/FormLogo"
import BasicModel from '../helper/BasicModal';
import SelectProduct from './SelectProduct'

import { CGST_RATES, IGST_RATES, SGST_RATES } from '../../utils/constants';
import { customSort, formattedDate, getSum, sendWhatshappMsg } from '../../utils/helper'
import { totalNoOfOrders } from '../../services/sale';
import { apiConnector } from "../../utils/apiConnector"
import { CREATE_ORDER, GET_ALL_CUSTOMERS, GET_ALL_PRODUCTS } from '../../utils/APIs';
import { increaseSellOrders } from '../../slices/data';

const SaleInvoice = () => {

    const totalSellOrders = useSelector(store => store.data.totalSellOrders);
    const dispatch = useDispatch();

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);


    async function fetchCustomersAndProducts() {
        try {
            const { allCustomersDoc } = await apiConnector(GET_ALL_CUSTOMERS);
            const { allProductsDoc } = await apiConnector(GET_ALL_PRODUCTS)

            // Arrange in alphabet order => help in searching to user in select box
            allCustomersDoc.sort(customSort('name'));
            allProductsDoc.sort(customSort('productName'));

            setProducts(allProductsDoc);
            setCustomers(allCustomersDoc);

        } catch (error) {
            console.log(error.message, 'fetch customers in saleinvoice component');
        }
    }

    // form data 
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]); // array of objects
    const [discount, setDiscount] = useState(0);
    const [CGST, setCGST] = useState('');
    const [SGST, setSGST] = useState('');
    const [IGST, setIGST] = useState('');
    const [advance, setAdvance] = useState(0);
    const [note, setNote] = useState('');

    // raw amount
    const productsAmount = getSum(selectedProducts);
    // amount after discount
    const discountAmount = productsAmount - discount;
    // amount after tax
    const totalAmount = discountAmount + (discountAmount * (CGST + SGST + IGST)) / 100;

    async function submitHandler() {
        try {

            // Frontend checks --> for user better expreience
            if(!selectedCustomer){
                return toast.error("Select Customer.")
            } else if( selectedProducts.length === 0){
                return toast.error("At Least select a product")
            } else if( discount < 0 ){
                return toast.error("Discount can't be negative.")
            } 
            else if( totalAmount <= 0){
                return toast.error("Amount can't be 0 or less.")
            }




            // ******************CALL API *************
            const orderData = {
                customerId: selectedCustomer._id,
                customer: {
                    customerId: selectedCustomer._id,
                    name: selectedCustomer.name,
                    email: selectedCustomer.email,
                    phone: selectedCustomer.phone,
                    address: selectedCustomer.address,
                    GSTNumber: selectedCustomer.GSTNumber,
                    PAN: selectedCustomer.PAN,
                    accountType: selectedCustomer.accountType
                },
                type: 'Sell',
                invoiceNo: totalSellOrders + 1,
                products: selectedProducts,
                discount: discount,
                GST: { SGST, CGST, IGST },
                orderPrice: totalAmount,
                advance: advance,
                note: note
            }

            const {orderDoc} = await apiConnector(CREATE_ORDER, 'POST', orderData)
            toast.success('Sale add successfully');

            sendWhatshappMsg(orderDoc);
            dispatch(increaseSellOrders());

            // reset all the state values
            resetHandler();

        } catch (error) {
            console.log('ORDER DATA API ERROR.............', error);
            toast.error(error.message);
        }
    }

    
    function resetHandler() {
        setSelectedCustomer('');
        setSelectedProducts([]);
        setDiscount(0);
        setCGST('');
        setIGST('');
        setSGST('');
        setAdvance(0);
        setNote('');
    }

    useEffect(() => {
        fetchCustomersAndProducts();
        dispatch(totalNoOfOrders());
    }, []);

    return (
        <div>

            <div className='py-4 px-6  border-2  border-slate-400 shadow-xl rounded-md'>


                <FormLogo />

                {/* START : ************ Customer Data, Date , Invoice No. ************* */}
                <div>
                    <p className='text-lg font-medium mb-2'>Billed To :</p>


                    <div className='flex justify-between'>

                        {/* customer information */}
                        <div className='w-1/2 flex flex-col gap-2'>

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
                                        {/* <MenuItem value="" disabled>Select an customer</MenuItem> */}
                                        {
                                            customers.map(customer => {
                                                return <MenuItem key={customer?._id} value={customer}>{customer?.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>

                            {/* customer information - details */}
                            {
                                selectedCustomer && (
                                    <div className='flex flex-col gap-1'>

                                        <p className='text-xl font-bold '>{selectedCustomer?.name}</p>

                                        {
                                            selectedCustomer.address && <p className=''>
                                                {selectedCustomer?.address?.state} {selectedCustomer?.address.district} {selectedCustomer?.address.city}
                                            </p>
                                        }


                                        <p className=''>Mob. : {selectedCustomer?.phone}</p>


                                        {
                                            selectedCustomer.GSTNumber && <p className=''>GST No : {selectedCustomer?.GSTNumber}</p>
                                        }

                                        {
                                            selectedCustomer.PAN && <p className=''>PAN :  {selectedCustomer?.PAN}</p>
                                        }


                                    </div>
                                )
                            }


                        </div>



                        {/* date and invoice no. */}
                        <div>

                            <p className='text-lg'>Date : <span className='text-xl font-semibold'>{formattedDate(Date.now())}</span></p>

                            <p className='text-lg'>Invoice no. : <span className='text-xl font-semibold'> {totalSellOrders + 1} </span> </p>
                        </div>

                    </div>
                </div>
                {/* END : ************ Customer Data, Date , Invoice No. ************* */}



                {/* model which use CustomerForm component */}
                <BasicModel />


                <hr />

                {/* START : ******************* Product Option **************************  */}
                {
                    selectedCustomer && (
                        <div className='my-4'>
                            <p className='text-lg font-medium mb-2'>Select Product :</p>

                            <SelectProduct products={products} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
                        </div>
                    )
                }
                {/* END : ******************* Product Option **************************  */}



                {/* START : *******************discount, GST,Advance,totalAmount,note****************  */}
                {
                    selectedCustomer && (
                        <div>


                            <div className='flex justify-end my-4'>


                                <div className='flex flex-col gap-2'>
                                    <TextField value={discount} onChange={(e) => setDiscount(e.target.value)} id="discount" label="Discount" type='number' size='small' />

                                    {/* CGST */}
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel id="csgt" className='mb-2'>CGST </InputLabel>
                                            <Select
                                                labelId="csgt"
                                                label="csgt"
                                                id="unit"
                                                required
                                                size='small'
                                                value={CGST}
                                                onChange={(e) => setCGST(e.target.value)}
                                            >
                                                {
                                                    CGST_RATES.map((rate, index) => {
                                                        return <MenuItem key={index} value={rate}>{rate} %</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>


                                    {/* SGST */}
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel id="csgt" className='mb-2'>SGST </InputLabel>
                                            <Select
                                                labelId="csgt"
                                                label="csgt"
                                                id="unit"
                                                required
                                                size='small'
                                                value={SGST}
                                                onChange={(e) => setSGST(e.target.value)}
                                            >
                                                {
                                                    SGST_RATES.map((rate, index) => {
                                                        return <MenuItem key={index} value={rate}>{rate} %</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* IGST */}
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel id="csgt" className='mb-2'>IGST </InputLabel>
                                            <Select
                                                labelId="csgt"
                                                label="csgt"
                                                id="unit"
                                                required
                                                size='small'
                                                value={IGST}
                                                onChange={(e) => setIGST(e.target.value)}
                                            >
                                                {
                                                    IGST_RATES.map((rate, index) => {
                                                        return <MenuItem key={index} value={rate}>{rate} %</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <TextField id="totalAmount" disabled value={totalAmount} label="Total Amount" type='number' size='small' />

                                </div>
                            </div>

                            <div className='flex flex-col gap-2 items-start'>
                                <TextField value={advance} onChange={(e) => setAdvance(e.target.value)} id="advance" label="Advance Received" type='number' size='small' />
                                <TextField value={note} onChange={(e) => setNote(e.target.value)} fullWidth id="note" label="Additional Msg" type='text' size='small' />
                            </div>

                        </div>
                    )
                }
                {/* END : *******************discount, GST,Advance,totalAmount,note****************  */}


                <div className='my-4 flex gap-4'>
                    <Button variant="contained" onClick={submitHandler}>Submit</Button>
                    <Button variant="contained" onClick={resetHandler} color="error">Reset</Button>
                </div>


            </div>


        </div>
    )
}

export default SaleInvoice