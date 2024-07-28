import React from 'react'

const FormLogo = ({title}) => {
    return (
        <div className='text-center py-2'>

            <h2 className='font-bold text-2xl capitalize'>{title} Invoice</h2>
            <h1 className='font-bold text-4xl'>Ritik Advertising</h1>
            <div className='my-1'>
                <p className='mb-1'>ADD. Silarpur Road, Dankaur Distt - G.B. Nagar (U.P.) - 203201</p>
                <p>Mob. 9412845464, Email ID - yadav.ritik@gmail.com</p>
                <p className='my-1'>A/C No. : 42745671639, IFSC : SBIN0002329, SBI Dankaur</p>
                <p className='my-1'>UPI ID : 42745671639@sbi</p>
            </div>
            
        </div>
    )
}

export default FormLogo