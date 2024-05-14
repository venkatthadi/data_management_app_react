import { useContext, useEffect, useState } from "react";
import { AccountsContext, userApiUrl } from "../utils/contexts/accountsContext";
import { AccountContentButtons } from "./AccountContentButtons";
import { useFetchAccounts } from "../utils/hooks/accounts/useFetchAccounts";


export function AccountContainer() {
    
    const accountsContextData = useContext(AccountsContext);
    const [ name, setName ] = useState("");

    return(
        <div className="container">
            <br/>
            <form
                onSubmit={(e) => {
                        
                        // e.preventDefault();

                        if(name) {
                            fetch(userApiUrl, {
                                method: "POST", // POST req
                                body: JSON.stringify({
                                    name: name,
                                }),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                }
                            })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log("Success");
                                console.log(data);
                            }).catch((err) => console.log(err));

                            setSync((sync) => !sync);
                        }

                    }
                }
            >
                <div>
                    <label htmlFor="name">Name: </label>  
                    <input 
                        id="name" 
                        name="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <button>
                    Add account
                </button>
            </form>
        <table className="table table-hover table-striped table-bordered">
            <thead className="thead-dark">
                <tr>
                <th>Account ID</th>
                <th>Name</th>
                <th colSpan="3"></th>
                </tr>
            </thead>
            <tbody>
            { accountsContextData.map((currentAccount) => (
                <tr key={currentAccount.id}>
                    <td>{currentAccount.id}</td>
                    <td>{currentAccount.name}</td>
                </tr>
            )) }
            </tbody>
        </table>
        </div>
    )
}