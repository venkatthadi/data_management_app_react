import { useContext, useState } from "react";
import { AccountContext } from "../utils/contexts/accountsContext";

export function AccountContentButtons() {
    
    const { id, setAccounts } = useContext(AccountContext);
    const [ value, setValue ] = useState("");

    return(
        <div>
            <div>
                <h3>Account Content Buttons</h3>
            </div>
            {id}
            <br/>
            <label htmlFor="updateName">Updated name: </label>
            <input
                id="updateName"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button 
                onClick={() => {
                    setAccounts((currentState) => ({
                        ...currentState,
                        name: value,
                    }));
                }}
            >
                Save
            </button>
        </div>
    )
}