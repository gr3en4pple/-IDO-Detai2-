import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import Web3Provider from './Web3Provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3Provider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Web3Provider>
  </React.StrictMode>
)
