import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import Web3Provider from './Web3Provider.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3Provider>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </Web3Provider>
  </React.StrictMode>
)
