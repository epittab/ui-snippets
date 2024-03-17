import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Auth from './Auth.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><App /></AuthProvider>
  },
  {
    path: "/auth/token",
    element: <AuthProvider><Auth /></AuthProvider >
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
