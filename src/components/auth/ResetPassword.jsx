import { useState } from "react";
import toast from "react-hot-toast";

import { TextField, Button, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { apiConnector } from '../../utils/apiConnector'
import { RESET_PASSWORD, RESET_PASSWORD_OTP, VERIFY_OTP } from "../../utils/APIs";

const ResetPassword = ({ setResetPassword }) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [OTP, SetOTP] = useState('');

    const [isOTPSent, setIsOTPSent] = useState(false);
    const [isOTPVerify, setIsOTPVerify] = useState(false);


    async function sendOTP() {

        // Frontend checks --> for user better expreience
        if (!user) {
            return toast.error("Enter user name!")
        }

        const toastId = toast.loading("Loading...");
        try {
            const { OTP } = await apiConnector(RESET_PASSWORD_OTP, 'POST', { user });
            setIsOTPSent(true);

        } catch (error) {
            console.log(' RESET PASSWORD OTP! API ERROR.............', error);
            toast.error(error.message);
        }
        toast.dismiss(toastId);

    }

    async function OTPverficationHandler() {


        // don't api call if OTP is not entered fully
        if (OTP.length !== 6) {
            return toast.error("Enter complete OTP!");
        }

        const toastId = toast.loading("Loading...");

        try {
            await apiConnector(VERIFY_OTP, 'POST', { user, OTP });
            setIsOTPVerify(true);
            // so that , new otp can be send on the mail
            setIsOTPSent(false);

        } catch (error) {
            console.log(' VERIFY  OTP! API ERROR.............', error);
            toast.error(error.message);
        }
        toast.dismiss(toastId);
    }

    async function resetPasswordHandler(e) {

        e.preventDefault();


        // Frontend checks --> for user better expreience
        if (password !== confirmPassword) {
            return toast.error("Passwords are not matched!")
        } else if (password.length < 8) {
            return toast.error("Passwords must greater than 8 characters!")
        }

        const toastId = toast.loading("Loading...");

        try {
            await apiConnector(RESET_PASSWORD, 'POST', { user, OTP, password, confirmPassword });
            setResetPassword(false);


        } catch (error) {
            console.log(' RESET PASSWORD ! API ERROR.............', error);
            toast.error(error.message);
        }
        toast.dismiss(toastId);
    }


    return (
        <div className=' w-10/12 mx-auto p-4 my-8 mt-12 shadow shadow-orange-600 rounded-xl'>

            <h1 className='text-2xl font-bold text-center'>Reset Password</h1>


            {
                isOTPVerify ? (
                    <form onSubmit={resetPasswordHandler} className='p-4 flex flex-col gap-4'>

                        <div className="flex gap-4">

                            <FormControl fullWidth variant="outlined">
                                <InputLabel required htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>




                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                />
                            </FormControl>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="contained" className="capitalize" onClick={resetPasswordHandler} type="submit">Reset Password</Button>
                            <Button variant="contained" className="capitalize" onClick={() => setIsOTPVerify(false)} type="submit">Back</Button>
                        </div>

                    </form>
                ) : (
                    <div className="flex flex-col gap-4">


                        <div className='flex gap-4'>
                            <TextField fullWidth value={user} onChange={(e) => setUser(e.target.value)} id="name" name='name' label="Name" type='text' required />
                        </div>

                        {
                            isOTPSent ?
                                (<p>Mail sent successfully! Please checkout your registered email id. </p>) : (
                                    <div>
                                        <Button variant="contained" className="capitalize" onClick={sendOTP}>Send OTP</Button>
                                    </div>
                                )
                        }


                        {/* opt field and verify button */}
                        {
                            isOTPSent && (
                                <div className="mt-4 flex flex-col gap-4">
                                    <TextField fullWidth value={OTP} onChange={(e) => SetOTP(e.target.value)} inputProps={{ maxLength: 6 }} label="OTP" type='text' />
                                    <div>
                                        <Button variant="contained" className="capitalize" onClick={OTPverficationHandler}>Verify</Button>
                                    </div>
                                </div>
                            )
                        }

                        <div>
                            <Button variant="contained" className="capitalize" onClick={()=> setResetPassword(false)}>Login</Button>
                        </div>

                    </div>
                )
            }




        </div>
    )
};

export default ResetPassword;