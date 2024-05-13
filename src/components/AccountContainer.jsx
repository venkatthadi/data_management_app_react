import { useContext } from "react";
import { AccountContent } from "./AccountContent";
import { AccountContext } from "../utils/contexts/accountsContext";


export function AccountContainer() {
    
    const accountContextData = useContext(AccountContext);

    return(
        <div>
            <div>
                <h2>Account Container</h2>
            </div>
            <div>Display name: {accountContextData.name}</div>
            <div>Account ID: {accountContextData.id}</div>
            <AccountContent />
        </div>
    )
}