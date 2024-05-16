import { Header } from "./components/Header";
import { useState, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { TokenContext } from "./utils/contexts/authContext";

export default function App() {

    const [ isAuth, setIsAuth ] = useState(false);
    const [ token, setToken ] = useState("");

    return(
        <>
            <div>
                <TokenContext.Provider value={{ isAuth, setIsAuth, token, setToken }}>
                    <Header />
                    <Outlet />
                </TokenContext.Provider>
            </div>
        </>
    );
}
