import { useState, useEffect } from "react";
import { useFetchAccounts } from "./utils/hooks/useFetchAccount";

import { AccountContext } from "./utils/contexts/accountsContext";
import { AccountContainer } from "./components/AccountContainer";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function App() {

    const { account, loading, errors } = useFetchAccounts(1);
    // console.log(account, loading, errors);

    const [accounts, setAccounts] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && !errors && account) {
            setAccounts(account);
            navigate("/users");
        }
    }, [loading, errors, account, navigate]);

    return(
        <> 
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>
            <AccountContext.Provider value={{ ...accounts, setAccounts }}>
                <div>
                    {loading ? "loading..." : <AccountContainer />}
                </div>
            </AccountContext.Provider>
            <Outlet/>
        </>
    );
}
