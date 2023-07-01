import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MyRoutes from './components/MyRoutes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <MyRoutes />
    </BrowserRouter>
  )
}

export default App
