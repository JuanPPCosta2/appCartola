import {  createRoot  } from 'react-dom/client'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Jogadores from './Jogadores.jsx'

const paginas = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/jogadores/:id', element: <Jogadores/>},
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={paginas}/> 
)
