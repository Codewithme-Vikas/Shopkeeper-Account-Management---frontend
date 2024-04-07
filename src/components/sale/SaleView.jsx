import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { Button } from '@mui/material'

import FormLogo from '../common/FormLogo';

import { fetchSale } from '../../services/sale';
import { formattedDate } from '../../utils/helper';
import ProductTable from '../../../del/ProductTable';

const SaleView = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [saleData, setSaleData] = useState('');

    useEffect(() => {
        fetchSale(id, setSaleData);
    }, [])

    return !saleData ? 'Loading...' : (
        <div>

            <div className='py-4 px-6  border-2  border-slate-400 shadow-xl rounded-md'>


                <FormLogo />

                {/* START : ************ Customer Data, Date , Invoice No. ************* */}
                <div className='mb-2'>
                    <p className='text-lg font-medium mb-2'>Billed To :</p>


                    <div className='flex justify-between'>

                        {/* customer information */}
                        <div className='w-1/2 flex flex-col gap-2 '>

                            <p className='text-xl font-bold capitalize'>{saleData?.customer?.name}</p>

                            {/* other customer detail */}
                            <div className='flex flex-col gap-1'>


                                {
                                    saleData?.customer?.address && <p className='capitalize'>{saleData?.customer?.address}</p>
                                }


                                <p className=''>Mob. : {saleData?.customer?.phone}</p>


                                {
                                    saleData?.customer.email && <p className=''>Email : {saleData?.customer?.email}</p>
                                }

                                {
                                    saleData?.customer.GSTNumber && <p className=''>GST No : {saleData?.customer?.GSTNumber}</p>
                                }

                                {
                                    saleData?.customer.PAN && <p className=''>PAN :  {saleData?.customer?.PAN}</p>
                                }


                            </div>



                        </div>



                        {/* date and invoice no. */}
                        <div>

                            <p className='text-lg'>Date : <span className='text-xl font-semibold'>{formattedDate(saleData?.createdAt)}</span></p>

                            <p className='text-lg'>Invoice no. : <span className='text-xl font-semibold'> {saleData.invoiceNo} </span> </p>
                        </div>

                    </div>


                </div>
                {/* END : ************ Customer Data, Date , Invoice No. ************* */}



                {/* START : ******************* Product Option **************************  */}
                <div className='my-4'>
                    {/* <p className='text-lg font-medium mb-2'>Product List :</p> */}

                    {/* <SelectProduct products={saleData?.products} /> */}
                    <ProductTable selectedProducts={saleData?.products} />
                </div>
                {/* END : ******************* Product Option **************************  */}



                {/* START : *******************discount, GST,Advance,totalAmount,note****************  */}

                <div>


                    <div className='flex justify-end my-4'>


                        <div className='flex flex-col gap-2'>

                            {/* discount */}
                            {
                                saleData.discount > 0 && (
                                    <p>Discount : <span>{saleData.discount} %</span></p>
                                )
                            }

                            {/* CGST */}
                            {
                                saleData.GST?.CGST && (
                                    <p>CGST : <span>{saleData.GST?.CGST} %</span></p>
                                )
                            }


                            {/* SGST */}
                            {
                                saleData.GST?.SGST && (
                                    <p>SGST : <span>{saleData.GST?.SGST} %</span></p>
                                )
                            }

                            {/* IGST */}
                            {
                                saleData.GST?.IGST && (
                                    <p>IGST : <span>{saleData.GST?.IGST} %</span></p>
                                )
                            }

                            <p>Total Amount : <span>{saleData?.orderPrice}</span></p>

                        </div>
                    </div>

                    <div className='flex flex-col gap-2 items-start'>
                        {
                            saleData.advance > 0 && (
                                <p>Advance : <span>{saleData.advance} ₹</span></p>
                            )
                        }

                        {
                            saleData.note && (
                                <p>Note : <span>{saleData.note}</span></p>
                            )
                        }
                    </div>

                </div>
                {/* END : *******************discount, GST,Advance,totalAmount,note****************  */}


                <div className='my-4 flex gap-4'>
                    <Link to={`/sale/${id}/edit`}>
                        <Button variant="contained" >Edit</Button>
                    </Link>
                    <Button variant="contained">Print</Button>
                    <Link to={'/report/sale'}>
                        <Button variant="contained">Sales Report</Button>
                    </Link>
                    <Button variant="contained">Whatshapp</Button>
                    <Button variant="contained" onClick={()=> navigate(-1)}>Go Back</Button>
                </div>


            </div>


        </div>
    )
}

export default SaleView;

