import { DataGrid } from '@mui/x-data-grid';
import { productAmount, productTotalArea } from '../../../utils/helper';

const columns = [
    { field: 'id', headerName: 'S.N.', width: 60 },
    { field: 'productName', headerName: 'Product name', width: 150 },
    { field: 'height', headerName: 'Height', width: 60, type: 'number' },
    { field: 'width', headerName: 'Width', type: 'number', width: 60 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 70, },
    {
        field: 'area',
        headerName: 'Total Area',
        description: 'Area of the products.',
        sortable: false,
        width: 80,
        valueGetter: (value, row) => productTotalArea( row.height , row.width , row.quantity) || '_',
    },
    { field: 'price', headerName: 'Price', type: 'number', width: 100, },
    { field: 'amount', headerName: 'Amount', type: 'number', width: 100, },
    { field: 'note', headerName: 'Note', width: 250, },
];

export default function ProductTable({ products }) {

    // create a new array , to add on amount property to the product
    // override 'id' because DataGrid needs it
    const productsList = products.map((product, index) => {
        const obj = {
            ...product,
            id: index + 1,
            amount : productAmount(product),
        }
        return obj;
    });


    return (
        <div className="w-full" >
            <DataGrid
                rows={productsList}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
            // checkboxSelection
            // disableRowSelectionOnClick
            />
        </div>
    );
}