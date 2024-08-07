import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import store from './slices/store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <Provider store={store}>
            <App />
            <Toaster toastOptions={{style : {zIndex : 1000}}}/>
        </Provider>
    // </React.StrictMode>,
)
