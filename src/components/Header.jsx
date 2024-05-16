import { Link } from "react-router-dom";

export function Header() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Home</Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/accounts" className="nav-link">Accounts</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/networks" className="nav-link">Networks</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/schools" className="nav-link">Schools</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/usertypes" className="nav-link">Usertypes</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/users" className="nav-link">Users</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}