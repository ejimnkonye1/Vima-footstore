import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/cartcontext.jsx'
import React from 'react'
import  { persistor, store } from './store.jsx'
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux'





createRoot(document.getElementById('root')).render(
 <React.StrictMode>

    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <CartProvider>
  <App />
    </CartProvider>
      </PersistGate>
     </Provider>
   </React.StrictMode>
)
