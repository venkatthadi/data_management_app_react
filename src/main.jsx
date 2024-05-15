import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { AccountsPage } from './pages/accounts';
import "./globals.css";
import { NetworksPage } from './pages/networks';

export const userApiUrl = "http://127.0.0.1:5001";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [],
    },
    {
        path: "/accounts",
        element: <AccountsPage />,
        children: [],
    },
    {
        path: "/networks",
        element: <NetworksPage />,
        children: [],
    },
    {
        path: "/schools",
        element: <AccountsPage />,
        children: [],
    },
    {
        path: "/usertypes",
        element: <AccountsPage />,
        children: [],
    },
    {
        path: "/users",
        element: <AccountsPage />,
        children: [],
    },

])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);