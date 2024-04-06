import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import { logout } from '../../services/auth';

const Navbar = () => {
    const dispatch = useDispatch();
    const token = useSelector(store => store.auth.token);

    async function LogoutHandler(){
        dispatch(logout());
    }

    return (
        <nav className='p-4 px-6 shadow-md flex justify-between'>

            <div className='flex gap-1 items-center'>
                <img alt='Icon' src='' className='w-10' />
                <span className='text-xl font-bold'>Ritik-Adversting</span>
            </div>

            {
                token && <div>
                    <Button variant="contained" onClick={ LogoutHandler }>LogOut</Button>
                </div>
            }

        </nav>
    )
}

export default Navbar;