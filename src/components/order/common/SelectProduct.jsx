import { useState } from 'react'
import toast from 'react-hot-toast';

import { TextField, Select, MenuItem, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { productAmount, productTotalArea } from '../../../utils/helper';

const SelectProduct = ({ products, selectedProducts, setSelectedProducts }) => {

    const [selectedProduct, setSelectedProduct] = useState('');


    // form data maintain
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');

    // const amount = (selectedProduct.unit !== 'PCS' && width && height) ? height * width * quantity * price : quantity * price;
    let amount = (width && height) ? height * width * quantity * price : quantity * price;
    amount = Math.round( amount );

    function addProductHandler() {

        // checks =>
        if (selectedProduct === '') {
            return toast.error('Select a product')
        } else if (Number(amount) <= 0) {
            return toast.error('Please enter valid amount')
        }


        const product = {
            productId: selectedProduct._id,
            unit: selectedProduct.unit,
            productName: selectedProduct.productName,
            price,
            quantity,
            height,
            width,
            note,
        }

        
        console.log( amount , "amount is ")

        setSelectedProducts(prev => ([...prev, product]))

        // reset all states
        setSelectedProduct('');
        setHeight('');
        setWidth('');
        setQuantity('');
        setPrice('');
        setNote('');
    }

    function removeProducthandler(productIndex) {
        const filterProducts = selectedProducts.filter((product, index) => index !== productIndex);
        setSelectedProducts(filterProducts);
    }

    return (
        <div>


            {/* update version */}
            <div>
                <table className="table-auto w-full border-collapse border border-slate-600 my-2">


                    <thead>
                        <tr>
                            <th className='border border-slate-600 p-2'>S. No.</th>
                            <th className='border border-slate-600 p-2'>Product Name</th>
                            <th className='border border-slate-600 p-2'>Height</th>
                            <th className='border border-slate-600 p-2'>Width</th>
                            <th className='border border-slate-600 p-2'>Quantity</th>
                            <th className='border border-slate-600 p-2'>Total Area</th>
                            <th className='border border-slate-600 p-2'>Price</th>
                            <th className='border border-slate-600 p-2'>Amount</th>
                            <th className='border border-slate-600 p-2'>Note</th>
                            <th className='border border-slate-600 p-2'>Action</th>
                        </tr>
                    </thead>


                    <tbody>

                        {/* Selected products are listed here */}
                        {
                            selectedProducts.map((product, index) => {
                                return <tr key={index}>
                                    <td className='border border-slate-600 p-2'>{index + 1}</td>
                                    <td className='border border-slate-600 p-2 min-w-36'>{product.productName}</td>
                                    <td className='border border-slate-600 p-2 w-24'>{product.height || '__'}</td>
                                    <td className='border border-slate-600 p-2 w-24'>{product.width || '__'}</td>
                                    <td className='border border-slate-600 p-2 w-24'>{product.quantity}</td>
                                    <td className='border border-slate-600 p-2 w-28'>
                                        {
                                            productTotalArea(product.height,product.width,product.quantity) || '__'
                                        }
                                    </td>
                                    <td className='border border-slate-600 p-2 w-28'>{product.price}</td>
                                    <td className='border border-slate-600 p-2'>{productAmount(product)}</td>
                                    <td className='border border-slate-600 p-2 max-w-36'>{product.note || '__'}</td>
                                    <td className='border border-slate-600 p-2 text-center'>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => removeProducthandler(index)}
                                            className='text-red-700 hover:bg-red-200'>
                                            <CloseIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            })
                        }


                        {/* START : *****************Inputs Inside tr ***************** */}
                        <tr>

                            {/* product options */}
                            <td className='border border-slate-600' colSpan={2}>
                                <Select
                                    fullWidth
                                    labelId="productLabel"
                                    id="product"
                                    required
                                    value={selectedProduct}
                                    onChange={(e) => {
                                        setSelectedProduct(e.target.value)
                                        // To handle :- In worst case : first user select a product and set width and height of it,then select/change product which unit is PCS
                                        // if (e.target.value.unit === 'PCS') {
                                        //     setHeight('');
                                        //     setWidth('');
                                        // }
                                    }}
                                >
                                    {/* <MenuItem value="" disabled>Select an product</MenuItem> */}
                                    {
                                        products.map(product => {
                                            // To Do :- instead of value=product[object], try to us productName or unique id something
                                            return <MenuItem key={product?._id} value={product}>{product?.productName}</MenuItem>
                                        })
                                    }
                                </Select>
                            </td>

                            {/* height */}
                            <td className='border border-slate-600'>
                                <TextField
                                    id="height"
                                    fullWidth
                                    // disabled={selectedProduct.unit === 'PCS'}
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    required
                                    type='number'
                                />
                            </td>

                            {/* width */}
                            <td className='border border-slate-600'>
                                <TextField
                                    id="width"
                                    fullWidth
                                    // disabled={selectedProduct.unit === 'PCS'}
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    required
                                    type="number"
                                />
                            </td>

                           

                            {/* quantity */}
                            <td className='border border-slate-600'>
                                <TextField
                                    fullWidth
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    id="quantity"
                                    required
                                    type="number"
                                />
                            </td>

                            {/* Total area = height*width*quantity */}
                            <td className='border border-slate-600'>
                                <TextField fullWidth value={ productTotalArea(height, width, quantity)} disabled id="area" type='number' />
                            </td>


                            {/* price */}
                            <td className='border border-slate-600'>
                                <TextField
                                    fullWidth
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    id="price"
                                    required
                                    type='number'
                                />
                            </td>

                            {/* amount */}
                            <td className='border border-slate-600'>
                                <TextField
                                    fullWidth
                                    value={amount.toString()}
                                    disabled
                                    id="amount"
                                    type="number" />
                            </td>

                            {/* note */}
                            <td className='border border-slate-600'>
                                <TextField
                                    fullWidth
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    id="note"
                                    type='text'
                                />
                            </td>

                            {/* add product button */}
                            <td className='border border-slate-600 text-center'>
                                <IconButton
                                    aria-label="add"
                                    onClick={addProductHandler}
                                    className='text-green-800 hover:bg-green-300'
                                >
                                    <AddIcon />
                                </IconButton>
                            </td>
                        </tr>
                        {/* END : *****************Inputs Inside tr ***************** */}


                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default SelectProduct;