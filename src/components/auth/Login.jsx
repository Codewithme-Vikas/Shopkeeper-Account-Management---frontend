import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { login } from '../../services/auth';

const Login = ({ setResetPassword }) => {
    const dispatch = useDispatch()



    async function loginHandler(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        dispatch(login(data.name, data.password))

    }

    return (
        <div className='p-4 my-8 mt-12 shadow shadow-orange-600 rounded-xl'>

            <h1 className='text-2xl font-bold text-center'>Login</h1>

            <form onSubmit={loginHandler} className='p-4 flex flex-col gap-4'>


                <div className='flex gap-4'>
                    <TextField fullWidth id="name" name='name' label="Name" type='text' required />
                    <TextField fullWidth id="password" name='password' label="Password" type="password" required />
                </div>

                <div>
                    <Button size='small' className='capitalize hover:underline' onClick={()=> setResetPassword(true)}>forget password?</Button>
                </div>

                <div>
                    <Button variant="contained" type='submit'>Login</Button>
                </div>

            </form>
        </div>
    )
};

export default Login;