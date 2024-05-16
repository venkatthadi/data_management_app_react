import { Link } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../utils/contexts/authContext";

export function Header() {

    const { isAuth, setIsAuth, token, setToken } = useContext(TokenContext);

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Home</Link>
            <div className="collapse navbar-collapse" id="navbarText">
                { isAuth && (
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/accounts" className="nav-link">Accounts</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/networks" className="nav-link">Networks</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/schools" className="nav-link">Schools</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/usertypes" className="nav-link">Usertypes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">Users</Link>
                        </li>
                    </ul>
                )}
            </div>
            <div className="navbar" id="navbarSupportedContent">
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}