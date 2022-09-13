import { BrowserRouter } from 'react-router-dom'
import PrivateRoute from './router/PrivateRoute'
import React from 'react'

function App() {
  return (
    <BrowserRouter>
      <PrivateRoute />
    </BrowserRouter>
  )
}

export default App