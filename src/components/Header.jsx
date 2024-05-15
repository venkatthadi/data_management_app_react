import { Link } from "react-router-dom";

export function Header() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Home</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/accounts" className="btn btn-secondary">Accounts</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/networks" className="btn btn-secondary">Networks</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/schools" className="btn btn-secondary">Schools</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/usertypes" className="btn btn-secondary">Usertypes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/users" className="btn btn-secondary">Users</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}