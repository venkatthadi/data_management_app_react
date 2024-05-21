import { Header } from "./components/Header";
import { useAuth } from "./utils/contexts/authContext";

export default function App() {

    const { isAuth } = useAuth();

    return(
        <div>
            <Header />
            <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Welcome to Data Management System</h1>
                { !isAuth && <p className="lead">Please login to continue</p> }
            </div>
            </div>
        </div>
    );
}
