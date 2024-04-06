import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchSale } from '../../services/sale';




const SaleView = () => {

    const { id } = useParams();
    const [ saleData, setSaleData ] = useState({});

    useEffect(()=>{
        fetchSale( id, setSaleData);
    },[])

  return (
    <div>
        { saleData.customer?.name}
    </div>
  )
}

export default SaleView;

