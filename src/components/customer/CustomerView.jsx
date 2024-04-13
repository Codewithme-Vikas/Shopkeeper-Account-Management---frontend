import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


import { apiConnector } from '../../utils/apiConnector';
import { formattedDate } from '../../utils/helper';
import { GET_CUSTOMER } from '../../utils/APIs'

const CustomerView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState('');
    const [sales, setSales] = useState([]);
    const [payments, setPayment] = useState([]);

    const totalSaleAmount = sales.reduce((total, sale) => total + sale.orderPrice, 0);

    // filter sales those have advance amount and then add by reduce method
    const totalAdvanceAmount = sales.filter(sale => sale.advance).reduce((total, sale) => total + sale.advance, 0);
    const totalPaymentAmount = payments.reduce((total, payment) => total + payment.amount, 0);
    const balance = totalSaleAmount - totalAdvanceAmount - totalPaymentAmount;

    async function getCustomer() {
        setLoading(true);
        try {
            const { customerDoc } = await apiConnector(GET_CUSTOMER + id);

            setCustomer(customerDoc);
            setSales(customerDoc?.orders);
            setPayment(customerDoc?.payments)


        } catch (error) {
            console.log('GET CUSTOMER! API ERROR.............', error);
            toast.error(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        getCustomer();
    }, []);


    return (
        <div className='px-6 flex flex-col gap-6'>


            {/* customer information */}
            <div className='gap-2'>


                <p className='text-2xl  mb-3 font-bold text-center'>{customer.name}</p>

                <div className='flex gap-10 justify-start'>
                    <div className='flex flex-col items-start gap-1'>

                        <p className='text-base font-medium'>Mob : {customer.phone}</p>
                        <p className='text-base font-medium'>Email : {customer.email || "__"}</p>
                        <p className='text-base font-medium'>Account Type : {customer.accountType}</p>
                    </div>

                    <div className='flex flex-col  items-start gap-2'>
                        <p className='text-base font-medium'>GSTNumber : {customer.GSTNumber || "__"}</p>
                        <p className='text-base font-medium'>PAN : {customer.PAN || "__"}</p>
                    </div>

                </div>

            </div>

            {/* net balance */}
            <div>
                <p className='text-xl font-medium'>Balance :

                    {/* if customer is buyer */}
                    {
                        customer.accountType === 'Buyer' && (
                            <>
                                {
                                    balance > 0 ?
                                        <span className='font-bold text-rose-500'>{balance} ₹</span> :
                                        <span className='font-bold text-green-500'>{Math.abs(balance)} ₹</span>
                                }
                            </>
                        )
                    }

                    {/* if customer is buyer */}
                    {
                        customer.accountType === 'Seller' && (
                            <>
                                {
                                    balance > 0 ?
                                        <span className='font-bold text-green-500'>{balance} ₹</span> :
                                        <span className='font-bold text-rose-500'>{Math.abs(balance)} ₹</span>
                                }
                            </>
                        )
                    }

                </p>
            </div>

            {/* sale list */}
            <div>

                <table className='table-auto border border-slate-500 border-collapse rounded w-full'>
                    <caption className="caption-top text-xl font-bold text-start my-1">
                    {customer.accountType === 'Buyer' ? 'Sale ' : 'Purchase '} List
                    </caption>
                    <thead>
                        <tr>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Date</th>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Invoice No.</th>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Product Name</th>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>{customer.accountType === 'Buyer' ? 'Sale ' : 'Purchase '} {' Amount '} (₹)</th>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Advance (₹)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* tr base on data */}
                        {
                            sales.map(sale => {
                                return (<tr key={sale._id}>
                                    <td className='border border-slate-500 border-collapse rounded p-2'>{formattedDate(sale?.createdAt)}</td>
                                    <td className='border border-slate-500 border-collapse rounded p-2'>{sale?.invoiceNo}</td>
                                    <td className='border border-slate-500 border-collapse rounded p-2'>
                                        {sale?.products.map(product => product.productName).join(',  ')}
                                    </td>
                                    <td className='border border-slate-500 border-collapse rounded p-2'>{sale?.orderPrice}</td>
                                    <td className='border border-slate-500 border-collapse rounded p-2'>{sale?.advance || "__"}</td>
                                </tr>)
                            })
                        }

                        {/* total tr */}
                        <tr>
                            <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold' colSpan={3}>Total</td>
                            <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold col-span-2'>{totalSaleAmount}</td>
                            <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold col-span-2'>{totalAdvanceAmount}</td>
                        </tr>
                    </tbody>
                </table>

            </div>



            {/*  Payments */}
            <div>

                <table className='table-auto border border-slate-500 border-collapse rounded w-full'>
                    <caption className="caption-top text-xl font-bold text-start my-1">
                        {customer.accountType === 'Buyer' ? 'Received' : 'Payment'}
                    </caption>
                    <thead>
                        <tr>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Date</th>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Note</th>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>	{customer.accountType === 'Buyer' ? 'Received' : 'Payment'} (₹)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* tr base on data */}
                        {
                            payments.map(payment => {
                                return (
                                    <tr key={payment._id}>
                                        <td className='border border-slate-500 border-collapse rounded p-2'>{formattedDate(payment.createdAt)}</td>
                                        <td className='border border-slate-500 border-collapse rounded p-2'>{payment.note}</td>
                                        <td className='border border-slate-500 border-collapse rounded p-2'>{payment.amount}</td>
                                    </tr>
                                )
                            })
                        }


                        {/* total tr */}
                        <tr>
                            <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold' colSpan={2}>Total</td>
                            <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold col-span-2'>{totalPaymentAmount}</td>
                        </tr>
                    </tbody>
                </table>

            </div>


            <div>
                <Button onClick={() => navigate(-1)} variant='contained'>Go Back</Button>
            </div>
        </div>
    )
}

export default CustomerView