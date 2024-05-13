import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function AccountsPage() {
    
    const [accounts, setAccounts] = useState([]);
    const { state } = useLocation();

    useEffect(() => {
        if(state && state.accounts) {
            setAccounts(state.accounts);
        }
    })

    return(
        <div>
            <h2>Accounts</h2>
            {accounts.map((account) => (
				<div key={account.id}>
					<h2>{account.name}</h2>
				</div>
			))}
        </div>
    );
}