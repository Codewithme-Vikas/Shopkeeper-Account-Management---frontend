import { useEffect} from 'react'

import MUIDataTable from "mui-datatables";

import ProductActions from './ProductActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../services/product';

const columns = [
    {   
        name : 'index',
        label: 'S. No.',
    },
    {
        name: "productName",
        label: "Name",
    },
    {
        name: "unit",
        label: "Unit",
    },
    {
        name: "price",
        label: "Price",
        options: {
            customBodyRender: (value) => value ? value : '__'
        }
    },
    {
        name: '_id',
        label: 'Actions',
        options: {
            sort: false,
            filter: false,
            download: false,
            print : false,
            customBodyRender: (value) => {
                return <ProductActions id={value} />
            }
        },
    }
];

const ProductList = () => {


    const products = useSelector( store=> store.data.products );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( fetchProducts());
    }, []);

    // Preprocess the customers data to add serial numbers
    const productsList = products.map( (product,index)=>{
        return {
            ...product,
            index : index + 1,
        }
    })
    
    // MUI table options
    const options = {
        filterType: 'multiselect',
        selectableRows: 'none',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 100],
    };

    return (
        <div>
            <MUIDataTable
                title={"Product List"}
                data={productsList}
                columns={columns}
                options={options}
                className='w-[1130px] '
            />
        </div>
    )
}

export default ProductList;