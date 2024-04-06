import { toast } from "react-hot-toast"
import { LOGIN } from "../utils/APIs"

import { setLoading, setToken } from "../slices/auth"


export function login(name, password) {
    return async (dispatch) => {

        const toastId = toast.loading("Loading...")
        

        dispatch(setLoading(true));

        try {
            const response = await fetch(LOGIN, {
                method : 'POST',
                body : JSON.stringify({name , password}),
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : 'include'
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error)
            }

            dispatch(setToken(data.token))

            localStorage.setItem("token", JSON.stringify(data.token))

            toast.success("Login Successful")

           
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false));

        toast.dismiss(toastId)
    }
}

export function logout() {
    return (dispatch) => {
        dispatch(setToken(null))

        localStorage.removeItem("token")

        toast.success("Logged Out")

    }
}
