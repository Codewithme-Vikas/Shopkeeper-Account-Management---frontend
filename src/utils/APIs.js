const URL = import.meta.env.VITE_BASE_URL ;
const BASE_URL = URL + '/api/v1/';

// Product endpoints
export const GET_ALL_PRODUCTS = BASE_URL + 'product/getAllProducts';

export const GET_PRODUCT = BASE_URL + 'product/getProduct/'
export const DELETE_PRODUCT = BASE_URL + 'product/delete/';

export const CREATE_PRODUCT = BASE_URL + 'product/create';
export const UPDATE_PRODUCT = BASE_URL + 'product/update';

// Customer endpoints
export const GET_ALL_CUSTOMERS = BASE_URL + 'customer/getAllCustomers';

export const GET_CUSTOMER = BASE_URL + 'customer/getCustomer/';
export const DELETE_CUSTOMER = BASE_URL + 'customer/delete/';

export const CREATE_CUSTOMER = BASE_URL + 'customer/createCustomer';
export const UPDATE_CUSTOMER = BASE_URL + 'customer/update';


// Authentication endpoints
export const LOGIN = BASE_URL + 'auth/login';

export const RESET_PASSWORD_OTP = BASE_URL + 'auth/resetPasswordOTP';

export const VERIFY_OTP = BASE_URL + 'auth/verifyOTP';

export const RESET_PASSWORD = BASE_URL + 'auth/resetPassword';


// Order endpoints
export const GET_ALL_ORDERS = BASE_URL + 'order/getAllOrders';
export const GET_ALL_SELL_ORDERS = BASE_URL + 'order/getAllSellOrders';
export const GET_ALL_BUY_ORDERS = BASE_URL + 'order/getAllBuyOrders';

export const CREATE_ORDER = BASE_URL + 'order/create';
export const EDIT_ORDER = BASE_URL + 'order/update';

export const GET_ORDER = BASE_URL + 'order/getOrder/';

// Payment endpoints
export const CREATE_PAYMENT = BASE_URL + 'payment/payment';

export const GET_CUSTOMER_CREDIT = BASE_URL + 'payment/cutomerCredit/';