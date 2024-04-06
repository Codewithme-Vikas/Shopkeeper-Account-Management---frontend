import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>

        {/* children will be injected here */}
        <Outlet/>

        
    </div>
  )
}

export default Home