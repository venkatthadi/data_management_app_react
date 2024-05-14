import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { AccountsPage } from './pages/accounts';
import "./globals.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [],
    },
    {
        path: "/users",
        element: <AccountsPage />,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);