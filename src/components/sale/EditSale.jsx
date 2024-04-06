import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast'

import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material'

import FormLogo from "../common/FormLogo"
import BasicModel from '../helper/BasicModal';
import SelectProduct from './SelectProduct'

import { CGST_RATES, IGST_RATES, SGST_RATES } from '../../utils/constants';
import { customSort, formattedDate, getSum } from '../../utils/helper'
import { apiConnector } from "../../utils/apiConnector"
import { EDIT_ORDER } from '../../utils/APIs';

import { fetchSale } from '../../services/sale';
import { fetchCustomers } from '../../services/customer';
import { fetchProducts } from '../../services/product';


const EditSale = () => {

    const { id } = useParams();
    const [saleData, setSaleData] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const customers = useSelector(store => store.data.customers);
    const products = useSelector(store => store.data.products);



    // form data 
    const [selectedCustomer, setSelectedCustomer] = useState({});
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
    let totalAmount = discountAmount + (discountAmount * (CGST + SGST + IGST)) / 100;

    async function editHandler() {
        try {

            // Frontend checks --> for user better expreience
            if (!selectedCustomer) {
                return toast.error("Select Customer.")
            } else if (selectedProducts.length === 0) {
                return toast.error("At Least select a product")
            } else if (discount < 0) {
                return toast.error("Discount can't be negative.")
            }
            else if (totalAmount <= 0) {
                return toast.error("Amount can't be 0 or less.")
            }




            // ******************CALL API *************
            // Note :- The ._id & customerId , problem is due to backend side API's response ( saleData has customerId and customers has ._id )
            const orderData = {
                orderId: id,
                customerId: selectedCustomer._id || selectedCustomer.customerId,
                customer: {
                    customerId: selectedCustomer._id || selectedCustomer.customerId,
                    name: selectedCustomer.name,
                    email: selectedCustomer.email,
                    phone: selectedCustomer.phone,
                    address: selectedCustomer.address,
                    GSTNumber: selectedCustomer.GSTNumber,
                    PAN: selectedCustomer.PAN,
                    accountType: selectedCustomer.accountType
                },
                products: selectedProducts,
                discount: discount,
                GST: { SGST, CGST, IGST },
                orderPrice: totalAmount,
                advance: advance,
                note: note
            }

            await apiConnector( EDIT_ORDER, 'POST', orderData)
            toast.success('Sale Updated!');

            // reset all the state values
            // resetHandler();
            return navigate(`/sale/${id}`)

        } catch (error) {
            console.log('ORDER DATA API ERROR.............', error);
            toast.error(error.message);
        }
    }


    useEffect(() => {
        fetchSale(id, setSaleData)
        dispatch(fetchCustomers());
        dispatch(fetchProducts());
    }, [])

    // update the states if saleData exists
    useEffect(() => {
        if (saleData) {
            setSelectedCustomer(saleData.customer);
            setSelectedProducts(saleData.products);
            setDiscount(saleData?.discount);
            setCGST(saleData?.GST?.CGST ?? '');
            setSGST(saleData?.GST?.SGST ?? '');
            setIGST(saleData?.GST?.IGST ?? '');
            setAdvance(saleData?.advance);
            setNote(saleData?.note);
        }
    }, [saleData])


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
                                        // this logic helps from warning(MUI), on intially render when there is not id
                                        value={selectedCustomer?.customerId ?  selectedCustomer?.customerId : (selectedCustomer?._id ?? '')}
                                        onChange={(e) => {                                         
                                            setSelectedCustomer(customers.find(customer => customer._id === e.target.value))
                                        }}
                                    >
                                        {
                                            // create a new array => because sort change the actual array  and we can't directly change the redux variable/state =>  so getting error 
                                            [...customers].sort(customSort('name')).map(customer => {
                                                return <MenuItem key={customer?._id} value={customer._id}>{customer?.name}</MenuItem>
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

                            <p className='text-lg'>Date : <span className='text-xl font-semibold'>{formattedDate(saleData.createdAt)}</span></p>

                            <p className='text-lg'>Invoice no. : <span className='text-xl font-semibold'> {saleData.invoiceNo} </span> </p>
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
                    <Button variant="contained" onClick={editHandler} color="error">Edit</Button>
                    <Button variant="contained" onClick={() => navigate(-1)} >Cancle</Button>
                </div>


            </div>


        </div>
    )
}

export default EditSale;