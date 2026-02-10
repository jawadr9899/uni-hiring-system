import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./main.css"
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Signup} from './pages/Signup.tsx'
import { Login } from './pages/Login.tsx'

// routes
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/login",
    element:<Login/>
  },{
    path:"/signup",
    element:<Signup/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
