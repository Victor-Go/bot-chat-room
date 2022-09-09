import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import reducers from './reducers'

const store = configureStore({
  reducer: reducers
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
)
