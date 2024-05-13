import { useState, useEffect } from "react";
import { useFetchAccounts } from "./utils/hooks/useFetchAccount";

import { AccountContext } from "./utils/contexts/accountsContext";
import { AccountContainer } from "./components/AccountContainer";

export default function App() {

    useFetchAccounts(1);

    const [accounts, setAccounts] = useState({
        id: 1,
        name: "Venkat",
    });

    return(
        <AccountContext.Provider value={{ ...accounts, setAccounts }}>
            <div>
                <AccountContainer />
            </div>
        </AccountContext.Provider>
    );
}
