import { useEffect} from 'react'

import MUIDataTable from "mui-datatables";

import Actions from './Actions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../services/customer';

const columns = [
    {   
        name : 'index',
        label: 'S. No.',
    },
    {
        name: "name",
        label: "Name",
    },
    {
        name: "phone",
        label: "Mobile No.",
        options: { filter: true, sort: false, }
    },
    {
        name: "address",
        label: "Address",
        options: {
            customBodyRender: (value) => value ? value : '__'
        }
    },
    {
        name: "email",
        label: "email",
        options: {
            customBodyRender: (value) => value ? value : '__'
        }
    },
    {
        name: "GSTNumber",
        label: "GST No.",
        options: {
            filter: true,
            customBodyRender: (value) => value ? value : '__'
        }
    },
    {
        name: "PAN",
        label: "PAN",
        options: {
            filter: true,
            customBodyRender: (value) => value ? value : '__'
        }
    },
    {
        name: "accountType", label: "Type",
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
                return <Actions id={value} />
            }
        },
    }
];



const CustomerList = () => {


    const customers = useSelector( store=> store.data.customers );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( fetchCustomers());
    }, []);

    // Preprocess the customers data to add serial numbers
    const customersList = customers.map( (customer,index)=>{
        return {
            ...customer,
            index : index + 1,
        }
    })
    
    // MUI table options
    const options = {
        filterType: 'multiselect',
        selectableRows: 'none',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 100],
        resizableColumns: true,
        draggableColumns :{
            enabled : true,
        }
    };

    return (
        <div>
            <MUIDataTable
                title={"Customer List"}
                data={customersList}
                columns={columns}
                options={options}
                className='w-[1130px] '
            />
        </div>
    )
}

export default CustomerList;