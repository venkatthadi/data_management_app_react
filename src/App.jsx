import { useState, useEffect, useContext } from "react";
import { useFetchAccounts } from "./utils/hooks/useFetchAccount";

import { AccountContext } from "./utils/contexts/accountsContext";
import { AccountDetails } from "./components/AccountDetails";
import { AccountContainer } from "./components/AccountContainer";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function App({ accountsData }) {

    const { account, loading, errors } = useFetchAccounts(1);
    const [ accountData, setAccountData ] = useState();

    const [accounts, setAccounts] = useState(accountsData);
    // const navigate = useNavigate();

    // console.log(accounts);

    useEffect(() => {
        if(!loading && !errors && account) {
            setAccountData(account);
            // navigate("/users");
        }
    }, [loading, errors, account]);

    return(
        <>
            { accounts.map((currentAccount) => (
                <AccountDetails key={currentAccount.id} account={currentAccount} setAccounts={setAccounts} />
            )) }
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
            <AccountContext.Provider value={{ ...accountData, setAccountData }}>
                <div>
                    {loading ? "loading..." : <AccountContainer />}
                    {/* <AccountContainer /> */}
                </div>
            </AccountContext.Provider>
            <Outlet/>
        </>
    );
}
