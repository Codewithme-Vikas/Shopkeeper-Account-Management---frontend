import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import { logout } from '../../services/auth';

import Logo from '../../assets/logo.png'

const Navbar = () => {
    const dispatch = useDispatch();
    const token = useSelector(store => store.auth.token);

    async function LogoutHandler() {
        dispatch(logout());
    }

    return (
        <nav id='navbar' className='p-4 px-6 sticky top-0 z-[10000] bg-white shadow-lg flex justify-between'>

            <a href="/" className='hover:no-underline'>
                <div className='flex gap-1 items-center'>
                    <img alt='Icon' src={Logo} className='w-20' />
                </div>
            </a>

            {
                token && <div>
                    <Button variant="contained" onClick={LogoutHandler}>LogOut</Button>
                </div>
            }

        </nav>
    )
}

export default Navbar;