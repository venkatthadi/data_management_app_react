import { useState, useEffect, useContext } from "react";
import { useFetchAccount } from "./utils/hooks/accounts/useFetchAccount";
import { useFetchAccounts } from "./utils/hooks/accounts/useFetchAccounts";

import { Header } from "./components/Header";
import { AccountContext } from "./utils/contexts/accountContext";
import { AccountsContext } from "./utils/contexts/accountsContext";
import { AccountDetails } from "./components/AccountDetails";
import { AccountContainer } from "./components/AccountContainer";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AccountsPage } from "./pages/accounts";

export default function App() {

    // const [accounts, setAccounts] = useState(accountsData);
    // const navigate = useNavigate();

    // console.log(accounts);

    return(
        <>
            <div>
                {/* { accountsData.map((currentAccount) => 
                    (<AccountDetails key={currentAccount.id} account={currentAccount} setAccounts={setAccountsData} />)
                ) } */}
                <Header />
                <Outlet />
            </div>
        </>
    );
}
