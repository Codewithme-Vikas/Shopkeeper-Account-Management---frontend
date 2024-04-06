import React from 'react'
import ProductForm from './ProductForm'
import ProductList from './ProductList'

const Product = () => {
    return (
        <div>

            <div className='shadow-lg'>

                <h2 className='text-xl text-center font-medium'>Customer Form</h2>

                <ProductForm />

            </div>


            <div className='my-2 p-1'>
                <ProductList />
            </div>
        </div>
    )
}

export default Product