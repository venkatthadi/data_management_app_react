import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { AccountContainer } from "../components/accounts/AccountContainer";
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
                <div className="container">
                    {loading ? "loading..." : <AccountContainer />}
                </div>
            </div>
        </>
    );
}