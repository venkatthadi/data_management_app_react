import { useContext } from "react";
import { AccountsContext } from "../utils/contexts/accountsContext";
import { AccountContentButtons } from "./AccountContentButtons";


export function AccountContainer() {
    
    const accountsContextData = useContext(AccountsContext);

    return(
        <div>
            <div>
                <h2>Accounts Container</h2>
            </div>
            { accountsContextData.map((currentAccount) => (
                <div>
                    {currentAccount.id}:{currentAccount.name}
                </div>
            )) }
            <AccountContentButtons />
        </div>
    )
}