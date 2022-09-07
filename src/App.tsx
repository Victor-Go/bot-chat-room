import { BrowserRouter } from 'react-router-dom'
import PrivateRoute from './router/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <PrivateRoute />
    </BrowserRouter>
  )
}

export default App