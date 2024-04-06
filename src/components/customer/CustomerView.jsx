import { Button } from '@mui/material';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CustomerView = () => {
    const { id } = useParams();
    const navigate = useNavigate() ;
    
  return (
    <div>
        <p>{id}</p>

        <Button onClick={ ()=> navigate(-1) } variant='contained'>Go Back</Button>
    </div>
  )
}

export default CustomerView