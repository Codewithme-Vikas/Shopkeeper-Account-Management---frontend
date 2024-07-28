import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PrintIcon from '@mui/icons-material/Print';
import { IconButton } from "@mui/material";

import { filterDataOnDate, formattedDate, printList } from "../../../utils/helper";

const OrderList = ({ title, orders, }) => {

    const [ordersData, setOrdersData] = useState([]);
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);  // Number of items to show per page

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Calculate total pages
    const totalPages = Math.ceil(ordersData.length / itemsPerPage);

    // Get the data for the current page
    const currentData = ordersData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handlers for pagination
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    // current total amount
    const totalCurrentAmount = currentData.reduce((total,data)=> total+data.orderPrice, 0);
    const totalCurrentAdvance = currentData.reduce((total,data)=> total+data?.advance,0);

    // set the ordersData
    useEffect(() => {
        setOrdersData(orders);
    }, [orders]);

    // Filter out  the ordersData as startDate & endDate changed
    useEffect(() => {
        setOrdersData(filterDataOnDate(startDate, endDate , orders));
    }, [startDate, endDate]);


    // for printing purpose
    const listRef = useRef(null);
    

    return (
        <div className='my-2 pb-6 border-bottom'>

            {/* title */}
            <p className='text-2xl text-center font-bold mb-4 text-rose-950'>{title} List</p>


            <div className="flex items-center justify-between">

                {/* start & end date */}
                <div className="mb-4">

                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="ml-2 p-1 border border-gray-300 rounded"
                        />
                    </label>

                    <label className="ml-4">
                        End Date:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="ml-2 p-1 border border-gray-300 rounded"
                        />
                    </label>


                </div>


                {/* print button */}
                <div>
                    <IconButton onClick={()=>printList(title,listRef)} aria-label="print" color="primary">
                        <PrintIcon />
                    </IconButton>
                </div>


            </div>

            {/* table data */}
            <div ref={listRef}>


                <table className='table table-auto border border-slate-500 border-collapse rounded w-full'>

                    <thead>
                        <tr>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Date</th>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Invoice No.</th>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Product Name</th>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Note</th>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Amount (₹)</th>
                            <th className='border border-slate-500 border-collapse rounded p-2 text-start'>Advance (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map(order => (
                            <tr key={order._id}>
                                <td className='border border-slate-500 border-collapse rounded p-2'>{formattedDate(order?.createdAt)}</td>

                                <td className='border border-slate-500 border-collapse rounded p-2'>

                                    <Link to={order.type === "Sell" ? `/sale/${order._id}` : `/sale/${order._id}`} className='p-1 cursor-pointer'>
                                        {order?.invoiceNo}
                                    </Link>

                                </td>

                                <td className='border border-slate-500 border-collapse rounded p-2'>
                                    {order?.products.map(product => product.productName).join(', ')}
                                </td>
                                <td className='border border-slate-500 border-collapse rounded p-2'>{order?.note ? order?.note :  "__"}</td>
                                <td className='border border-slate-500 border-collapse rounded p-2'>{order?.orderPrice}</td>
                                <td className='border border-slate-500 border-collapse rounded p-2'>{order?.advance || "__"}</td>
                            </tr>
                        ))}
                        {/* Total row */}
                        <tr>
                            <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold' colSpan={4}>Total</td>
                            <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold col-span-2'>{totalCurrentAmount}</td>
                            <td className='border border-slate-500 border-collapse p-2 py-3 text-md font-bold col-span-2'>{totalCurrentAdvance}</td>
                        </tr>
                    </tbody>
                </table>

            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 hover:cursor-pointer"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>


                <div className='flex gap-8 items-center'>


                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <span>
                        <label htmlFor="itemsPerPage" className='text-sm'>Rows per page : </label>
                        <select
                            id='itemsPerPage'
                            className='mx-2 p-1 px-2 rounded-md cursor-pointer'
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(e.target.value)
                                setCurrentPage(1)
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={100}>100</option>
                        </select>
                    </span>


                </div>


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

export default OrderList;