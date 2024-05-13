import { useState, useEffect } from "react";
import { useFetchAccounts } from "./utils/hooks/useFetchAccount";

import { AccountContext } from "./utils/contexts/accountsContext";
import { AccountContainer } from "./components/AccountContainer";

export default function App() {

    const { account, loading, errors } = useFetchAccounts(1);
    // console.log(account, loading, errors);

    const [accounts, setAccounts] = useState();

    useEffect(() => {
        if(!loading && !errors && account) setAccounts(account);
    }, [loading, errors, account]);

    return(
        <AccountContext.Provider value={{ ...accounts, setAccounts }}>
            <div>
                {loading ? "loading..." : <AccountContainer />}
            </div>
        </AccountContext.Provider>
    );
}
