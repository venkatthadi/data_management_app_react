import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { AccountContainer2 } from "../components/accounts/AccountContainer";
import { useFetchAccounts } from "../utils/hooks/accounts/useFetchAccounts";

export function AccountsPage() {

    const { accounts, loading, errors } = useFetchAccounts();
    const [ accountsData, setAccountsData ] = useState([]);
    useEffect(() => {
        if(!loading && !errors && accounts) {
            setAccountsData(accounts);
        }
    }, [loading, errors, accounts]);


    return(
        <> 
            <Header />
            <div className="container">
                <AccountsContext.Provider value={ accountsData }>
                    <div className="container">
                        {loading ? "loading..." : <AccountContainer2 />}
                    </div>
                </AccountsContext.Provider>
            </div>
        </>
    );
}