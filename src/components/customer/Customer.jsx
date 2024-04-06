

import CustomerForm from "./CustomerForm"
import CustomerList from './CustomerList';


const Customer = () => {

    return (
        <div>

            <div className='shadow-lg'>

                <h2 className='text-xl text-center font-medium'>Customer Form</h2>

                <CustomerForm />

            </div>


            <div className='my-2 p-1'>
                <CustomerList />
            </div>
        </div>


    )
};

export default Customer