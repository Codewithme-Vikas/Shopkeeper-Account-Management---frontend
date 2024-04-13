import React from 'react'
import { Outlet } from 'react-router-dom'


import SideBar from './common/SideBar'


const Body = () => {
    return (
        <div className='flex gap-2 mt-3'>

            <div  id='sidebar' className='min-h-screen p-4 shadow-md'>
                <SideBar />
            </div>


            {/* other conditional components base on URL */}
            <div className='w-full p-2 py-4 '>
               <Outlet/>
            </div>

        </div>
    )
};

export default Body;