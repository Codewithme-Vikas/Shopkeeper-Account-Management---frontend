const BASE_URL = 'http://localhost:3000/api/v1/'

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


// Order endpoints
export const GET_ALL_SELL_ORDERS = BASE_URL + 'order/getAllSellOrders';
export const GET_ALL_BUY_ORDERS = BASE_URL + 'order/getAllBuyOrders';

export const CREATE_ORDER = BASE_URL + 'order/create';
export const EDIT_ORDER = BASE_URL + 'order/update';

export const GET_ORDER = BASE_URL + 'order/getOrder/';
