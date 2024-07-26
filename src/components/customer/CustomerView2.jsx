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
    const [buyOrders, setBuyOrders] = useState([]);
    const [sellOrders, setSellOrders] = useState([]);
    const [receivedPayments, setRceivedPayments] = useState([]);
    const [payments, setPayments] = useState([]);


    // To Do : use useMemo ( no need to calculate it again and again )  -- [ React compiler should do it  , React 19]

    // Order related 
    const totalSaleAmount = sellOrders.reduce((total, order) => total + order.orderPrice, 0);
    const totalBuyAmount = buyOrders.reduce((total, order) => total + order.orderPrice, 0);
    // filter orders those have advance amount and then add by reduce method
    const totalSaleAdvance = sellOrders.filter(order => order.advance).reduce((total, order) => total + order.advance, 0);
    const totalBuyAdvance = buyOrders.filter(order => order.advance).reduce((total, order) => total + order.advance, 0);

    // payment related
    const totalReceivdAmount = receivedPayments.reduce((total, payment) => total + payment.amount, 0);
    const totalPaymentAmount = payments.reduce((total, payment) => total + payment.amount, 0);

    // total balance
    const balance = totalSaleAmount - totalSaleAdvance - totalBuyAmount + totalBuyAdvance - totalReceivdAmount + totalPaymentAmount;

    async function getCustomer() {
        setLoading(true);
        try {
            const { customerDoc } = await apiConnector(GET_CUSTOMER + id);

            setCustomer(customerDoc);

            // ***filter buy and sell type orders***
            setBuyOrders(customerDoc?.orders.filter(order => order.type === "Buy"));
            setSellOrders(customerDoc?.orders.filter(order => order.type === "Sell"));
            // ***filter Receivd and Payment type payments***
            setRceivedPayments(customerDoc?.payments.filter(payment => payment.type === "Received"));
            setPayments(customerDoc?.payments.filter(payment => payment.type === "Payment"));


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


            {/* Customer Information */}
            <div className='gap-2'>


                <p className='text-2xl  mb-3 font-bold text-center'>{customer.name}</p>

                <div className='flex gap-10 justify-start'>
                    <div className='flex flex-col items-start gap-1'>

                        <p className='text-base font-medium'>Mob : {customer.phone}</p>
                        <p className='text-base font-medium'>Email : {customer.email || "__"}</p>
                    </div>

                    <div className='flex flex-col  items-start gap-2'>
                        <p className='text-base font-medium'>GSTNumber : {customer.GSTNumber || "__"}</p>
                        <p className='text-base font-medium'>PAN : {customer.PAN || "__"}</p>
                    </div>

                </div>

            </div>

            {/* Net Balance */}
            <div>
                <p className='text-xl font-medium'>Balance :
                    <span className={`${balance >= 0 ? "text-green-500" : "text-red-500"} font-bold text-green-500 mx-1`}> {balance} ₹</span>
                </p>
            </div>

            {/* START : ***************** Sale & Buy List ******************** */}
            <OrderList
                heading="Sale"
                orders={sellOrders}
                totalAmount={totalSaleAmount}
                totalAdvance={totalSaleAdvance}
            />

            <hr />

            <OrderList
                heading="Purchase"
                orders={buyOrders}
                totalAmount={totalBuyAmount}
                totalAdvance={totalBuyAdvance}
            />

            <hr />

            {/* END : ***************** Sale & Purchase List ******************** */}


            {/*  START : ************** Recevied & Payment payments ****************** */}
            <PaymentList
                title="Received"
                payments={receivedPayments}
                totalAmount={totalReceivdAmount}
            />


            <PaymentList
                title="Payment"
                payments={payments}
                totalAmount={totalPaymentAmount}
            />
            {/*  END : ************** Recevied & Payment payments ****************** */}





            <div>
                <Button onClick={() => navigate(-1)} variant='contained'>Go Back</Button>
            </div>
        </div>
    )
}

export default CustomerView;


const OrderList2 = ({ heading, orders, totalAmount, totalAdvance }) => {
    return (
        <div>

            <table className='table-auto border border-slate-500 border-collapse rounded w-full'>
                <caption className="caption-top text-xl font-bold text-start my-1">
                    {heading} List
                </caption>
                <thead>
                    <tr>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Date</th>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Invoice No.</th>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Product Name</th>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Amount (₹)</th>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Advance (₹)</th>
                    </tr>
                </thead>

                <tbody>
                    {/* tr base on data */}
                    {
                        orders.map(order => {
                            return (
                                // <a className='bor block w-full'>
                                <tr key={order._id} >
                                    <td className='border border-slate-500 border-collapse rounded p-2'>{formattedDate(order?.createdAt)}</td>
                                    <td className='border border-slate-500 border-collapse rounded p-2'>{order?.invoiceNo}</td>
                                    <td className='border border-slate-500 border-collapse rounded p-2'>
                                        {order?.products.map(product => product.productName).join(',  ')}
                                    </td>
                                    <td className='border border-slate-500 border-collapse rounded p-2'>{order?.orderPrice}</td>
                                    <td className='border border-slate-500 border-collapse rounded p-2'>{order?.advance || "__"}</td>
                                </tr>
                                // {/* </a> */}
                            )
                        })
                    }

                    {/* total tr */}
                    <tr>
                        <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold' colSpan={3}>Total</td>
                        <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold col-span-2'>{totalAmount}</td>
                        <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold col-span-2'>{totalAdvance}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
};

const OrderList = ({ heading, orders, totalAmount, totalAdvance }) => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to show per page

    // Calculate total pages
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    // Get the data for the current page
    const currentData = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handlers for pagination
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    return (
        <div className='py-1 pb-5'>
            <table className='table-auto border border-slate-500 border-collapse rounded w-full'>
                <caption className="caption-top text-xl font-bold text-start my-1">
                    {heading} List
                </caption>
                <thead>
                    <tr>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Date</th>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Invoice No.</th>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Product Name</th>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Amount (₹)</th>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Advance (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map(order => (
                        <tr key={order._id}>
                            <td className='border border-slate-500 border-collapse rounded p-2'>{formattedDate(order?.createdAt)}</td>
                            <td className='border border-slate-500 border-collapse rounded p-2'>{order?.invoiceNo}</td>
                            <td className='border border-slate-500 border-collapse rounded p-2'>
                                {order?.products.map(product => product.productName).join(', ')}
                            </td>
                            <td className='border border-slate-500 border-collapse rounded p-2'>{order?.orderPrice}</td>
                            <td className='border border-slate-500 border-collapse rounded p-2'>{order?.advance || "__"}</td>
                        </tr>
                    ))}
                    {/* Total row */}
                    <tr>
                        <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold' colSpan={3}>Total</td>
                        <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold col-span-2'>{totalAmount}</td>
                        <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold col-span-2'>{totalAdvance}</td>
                    </tr>
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 hover:cursor-pointer"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 hover:cursor-pointer"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};



const PaymentList = ({ title, payments, totalAmount }) => {
    return (
        <div>

            <table className='table-auto border border-slate-500 border-collapse rounded w-full'>
                <caption className="caption-top text-xl font-bold text-start my-1">{title}</caption>
                <thead>
                    <tr>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Date</th>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Note</th>
                        <th className='border border-slate-500 border-collapse rounded p-2 text-start'>	{title} (₹)</th>
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
                        <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold col-span-2'>{totalAmount}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
};