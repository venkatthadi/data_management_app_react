import { useState, useEffect, useContext } from "react";
import { useFetchAccount } from "./utils/hooks/accounts/useFetchAccount";
import { useFetchAccounts } from "./utils/hooks/accounts/useFetchAccounts";

import { AccountContext } from "./utils/contexts/accountsContext";
import { AccountDetails } from "./components/AccountDetails";
import { AccountContainer } from "./components/AccountContainer";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function App() {

    const { accounts, loading1, errors1 } = useFetchAccounts();
    const { account, loading2, errors2 } = useFetchAccount(1);
    const [ accountData, setAccountData ] = useState();
    const [ accountsData, setAccountsData] = useState([]);
    useEffect(() => {
        if(!loading1 && !errors1 && accounts) {
            setAccountsData(accounts);
            // navigate("/users");
        }
    }, [loading1, errors1, accounts]);
    useEffect(() => {
        if(!loading2 && !errors2 && account) {
            setAccountData(account);
            // navigate("/users");
        }
    }, [loading2, errors2, account]);
    

    // const [accounts, setAccounts] = useState(accountsData);
    // const navigate = useNavigate();

    // console.log(accounts);

    return(
        <>
            { accountsData.map((currentAccount) => (
                <AccountDetails key={currentAccount.id} account={currentAccount} setAccounts={setAccountsData} />
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
                    {loading2 ? "loading..." : <AccountContainer />}
                    {/* <AccountContainer /> */}
                </div>
            </AccountContext.Provider>
            <Outlet/>
        </>
    );
}
