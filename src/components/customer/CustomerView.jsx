import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


import { apiConnector } from '../../utils/apiConnector';
import { GET_CUSTOMER } from '../../utils/APIs';

import OrderList from "./view_components/OrderList";
import PaymentList from "./view_components/PaymentList";
import Spinner from "../common/Spinner"

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


    return loading ? <Spinner/> : (
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
                title="Sale"
                orders={sellOrders}
            />



            <OrderList
                title="Purchase"
                orders={buyOrders}
            />


            {/* END : ***************** Sale & Purchase List ******************** */}


            {/*  START : ************** Recevied & Payment payments ****************** */}
            <PaymentList
                title="Received"
                payments={receivedPayments}
            />

            <PaymentList
                title="Payment"
                payments={payments}
            />
            {/*  END : ************** Recevied & Payment payments ****************** */}


            <div>
                <Button onClick={() => navigate(-1)} variant='contained'>Go Back</Button>
            </div>
        </div>
    )
}

export default CustomerView;