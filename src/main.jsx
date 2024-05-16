import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import "./globals.css";
import { AccountsPage } from './pages/accounts';
import { NetworksPage } from './pages/networks';
import { SchoolsPage } from './pages/schools';
import { UsertypesPage } from './pages/usertypes';
import { UsersPage } from './pages/users';

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
        element: <SchoolsPage />,
        children: [],
    },
    {
        path: "/usertypes",
        element: <UsertypesPage />,
        children: [],
    },
    {
        path: "/users",
        element: <UsersPage />,
        children: [],
    },

])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);