import { useContext, useEffect, useState } from "react";
import { AccountsContext, userApiUrl } from "../utils/contexts/accountsContext";
import { AccountContentButtons } from "./AccountContentButtons";
// import { useFetchAccounts } from "../utils/hooks/accounts/useFetchAccounts";
// import { useCreateAccount } from "../utils/hooks/accounts/useCreateAccount";


export function AccountContainer() {
    
    const accountsContextData = useContext(AccountsContext);
    const [ name, setName ] = useState("");
    const [ isEditing, setIsEditing ] = useState(false);
    const [ accountName, setAccountName ] = useState("");

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

                            // const { account, loading, errors } = useCreateAccount(name);
                            // console.log(`account: ${account}, errors: ${errors}`);
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
                    <button>
                        Add account
                    </button>
                </div>
            </form>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
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
                            {/* <td>{currentAccount.name}</td> */}
                            <td>
                            {isEditing ? <input 
                                id="name" 
                                name="name" 
                                value={currentAccount.name}
                                onChange={ (e) => { 
                                    setAccountName(e.target.value); 
                                } } 
                                /> : 
                                <span>
                                    {currentAccount.name}
                                </span>
                            }
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        fetch(`${userApiUrl}/${currentAccount.id}`, {
                                            method: "DELETE",
                                        })
                                        .then(() => {
                                            console.log("Delete successful");
                                        })
                                        .catch((err) => {console.log(err)});
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        setAccountName(currentAccount.name);
                                        setIsEditing((isEditing) => !isEditing);
                                    }}
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    disabled={!isEditing}
                                    onClick={() => {
                                        
                                        fetch(`${userApiUrl}/${currentAccount.id}`, {
                                            method: "PUT",
                                            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                                            body: JSON.stringify({ name: accountName }),
                                        })
                                        .then((response) => response.json())
                                        .then((data) => console.log(data))
                                        .catch((err) => console.log(`error: ${err}`));

                                        setIsEditing(false);
                                        setAccountName("");
                                    }}
                                >
                                    Save
                                </button>
                            </td>
                        </tr>
                    )) }
                    </tbody>
                </table>
            </form>
        </div>
    )
}