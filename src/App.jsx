import { Header } from "./components/Header";
import { useState, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function App() {

    return(
        <div>
            <Header />
        </div>
    );
}
