import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError();
  return (
    <div>
        <h1 className='text-lg font-medium'>Oops! Error occure</h1>
        <p>{error.message}</p>
        <p>{error.status}</p>
        <p>{error.statusCode}</p>
    </div>
  )
}

export default ErrorPage