import { Link } from "react-router-dom";

export function Header() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="btn btn-secondary">Home</Link>
            <div className="navbar">
                <ul className="nav navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/users" className="btn btn-secondary">Accounts</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}