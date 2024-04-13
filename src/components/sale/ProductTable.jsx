import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'S.N.', width: 60 },
    { field: 'productName', headerName: 'Product name', width: 150 },
    { field: 'height', headerName: 'Height', width: 60, type: 'number' },
    { field: 'width', headerName: 'Width', type: 'number', width: 60 },
    {
        field: 'area',
        headerName: 'Area',
        description: 'Area of the product.',
        sortable: false,
        width: 80,
        valueGetter: (value, row) => row.height * row.width || '_',
    },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 70, },
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
            amount: (product.height && product.width) ?
                product.height * product.width * product.quantity * product.price :
                product.quantity * product.price,
        }
        return obj;
    });


    return (
        <div className="max-h-[400px] w-full" >
            <DataGrid
                rows={productsList}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
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