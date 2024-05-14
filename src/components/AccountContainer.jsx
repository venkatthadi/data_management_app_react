import { useContext } from "react";
import { AccountContext } from "../utils/contexts/accountsContext";
import { AccountContentButtons } from "./AccountContentButtons";


export function AccountContainer() {
    
    const accountContextData = useContext(AccountContext);

    return(
        <div>
            <div>
                <h2>Account Container</h2>
            </div>
            <div>Name: {accountContextData.name}</div>
            <div>Account ID: {accountContextData.id}</div>
            <AccountContentButtons />
        </div>
    )
}