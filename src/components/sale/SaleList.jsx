import { Link } from 'react-router-dom';

import MUIDataTable from "mui-datatables";
import { IconButton } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview';
import EditIcon from '@mui/icons-material/Edit';

import { formattedDate } from '../../utils/helper';


const columns = [
    {
        name: 'index',
        label: 'S. No.',
    },
    {
        name: 'invoiceNo',
        label: "Invoice No."
    },
    {
        name: "customer",
        label: "Customer",
    },
    {
        name: "address",
        label: "Address",
        options: {
            customBodyRender: (value) => {
                return value ? value : "__";
            }
        }
    },
    {
        name: 'products',
        label: 'Products',
    },
    {
        name: "orderPrice",
        label: "Amount ⟨ ₹ ⟩",
    },
    {
        name: 'createdAt',
        label: 'Date',
    },
    {
        name: 'note',
        label: 'Note',
        options: {
            customBodyRender: (value) => {
                return value ? value : "__";
            }
        }
    },
    {
        name: '_id',
        label: 'Actions',
        options: {
            sort: false,
            filter: false,
            download: false,
            print: false,
            customBodyRender: (value) => {
                return <div>
                    <Link to={`/sale/${value}`}>
                        <IconButton className='text-green-800'>
                            <RateReviewIcon />
                        </IconButton>
                    </Link>
                    <Link to={`/sale/${value}/edit`}>
                        <IconButton color='primary'>
                            <EditIcon />
                        </IconButton>
                    </Link>
                </div>
            }
        },
    }
];

const SaleList = ({ salesData, title }) => {

    // Preprocess the Sale data to add serial numbers
    // Note :- I change the salesData so that , we can put all data in readable format in CSV download file
    const salesList = salesData.map((sale, index) => {
        return {
            _id: sale._id,
            invoiceNo: sale.invoiceNo,
            index: index + 1,
            customer: sale.customer.name,
            address: sale.customer?.address,
            products: sale.products.map(product => product.productName).join(',  '),
            orderPrice: sale.orderPrice,
            note: sale?.note,
            createdAt: formattedDate(sale.createdAt),
        }
    });

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
                title={`${title} List`}
                data={salesList}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default SaleList;