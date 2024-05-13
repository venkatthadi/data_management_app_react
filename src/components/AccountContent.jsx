// import { useContext } from "react";
import { AccountContentButtons } from "./AccountContentButtons";
// import { accountContext } from "../utils/contexts/accountsContext";

export function AccountContent() {
    
    // const accountContextData = useContext(accountContext);

    return(
        <div>
            <div>
                <h3>Account content</h3>
                <AccountContentButtons />
            </div>
        </div>
    );
}