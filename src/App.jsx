import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navbar from './components/common/Navbar'
import ErrorPage from './components/common/ErrorPage'
import Body from './components/Body'

// import SaleInvoice from './components/sale/SaleInvoice'
import SaleInvoice from './components/order/invoice/SaleInvoice';
import PurchaseInvoice from './components/order/invoice/PurchaseInvoice';

import Customer from './components/customer/Customer'
import Product from './components/product/Product'
import Home from './components/Home'
import LandingPage from './components/LandingPage'
import CustomerView from './components/customer/CustomerView'

import CustomerReport from './components/reports/CustomerReport'
import ProductReport from './components/reports/ProductReport'
import SaleReport from './components/reports/SaleReport'

import SaleView from './components/order/view/SaleView'
import PurchaseView from './components/order/view/PurchaseView'

import EditSale from './components/order/edit/EditSale';
import EditPurchase from './components/order/edit/EditPurchase';

import SaleReceived from './components/order/payment/SaleReceived'
import PurchasePayment from './components/order/payment/PurchasePayment'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Body />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'customer',
                element: <Customer />,
            },
            {
                path : 'customer/:id',
                element : <CustomerView/>
            },
            {
                path : 'product',
                element : <Product/>
            },
            {
                path: "sale/invoice",
                element: <SaleInvoice />
            },
            {
                path: "purchase/invoice",
                element: <PurchaseInvoice />
            },
            {
                path : 'sale/:id',
                element : <SaleView/>
            },
            {
                path : 'purchase/:id',
                element : <PurchaseView/>
            },
            {
                path : 'sale/:id/edit',
                element : <EditSale/>
            },
            {
                path : 'purchase/:id/edit',
                element : <EditPurchase/>
            },
            {
                path : 'report/customer',
                element : <CustomerReport/>
            },
            {
                path : 'report/product',
                element : <ProductReport/>
            },
            {
                path : 'report/sale',
                element : <SaleReport/>
            },
            {
                path : 'report/purchase',
                element : <SaleReport/>
            },
            {
                path : 'sale/received',
                element : <SaleReceived/>
            },
            {
                
                path : 'purchase/payment',
                element : <PurchasePayment/>
            },
        ]
    }
]);


function App() {

    const token = useSelector( store=> store.auth.token );

    
    if( token === null || token === undefined ) return <LandingPage/>

    return (
        <>
            <Navbar/>
            
            
            <RouterProvider router={router}></RouterProvider>

        </>
    )
}

export default App;
