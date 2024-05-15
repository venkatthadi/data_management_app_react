import { useEffect, useState } from "react";
import { userApiUrl } from "../../utils/contexts/accountsContext";
// import { useFetchAccounts } from "../utils/hooks/accounts/useFetchAccounts";

export function AccountContainer() {
    
    const [ accountsContextData, setAccountsContextData ] = useState([]);
    const [ name, setName ] = useState("");
    const [ editingAccountId, setEditingAccountId ] = useState(null);
    const [ editingField, setEditingField ] = useState('');
    const [ accountName, setAccountName ] = useState('');

    const fetchAccounts = async () => {
        try {
            const response = await fetch(userApiUrl);
            const data = await response.json();
            setAccountsContextData(data);
        } catch (error) {
            console.error("Error fetching accounts data:", error);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleDeleteClick = async (accountId) => {
        try {
            await fetch(`${userApiUrl}/${accountId}`, {
                method: "DELETE",
            });
            console.log("Delete successful");
            fetchAccounts();
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    const handleEditClick = (accountId, field, currentValue) => {
        setEditingAccountId(accountId);
        setEditingField(field);
        setAccountName(currentValue);
    };

    const handleSaveClick = (accountId) => {
        fetch(`${userApiUrl}/${accountId}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ name: accountName }),
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(`error: ${err}`));

        fetchAccounts();

        setEditingAccountId(null);
        setEditingField('');
        setAccountName('');
    };

    const handleAddAccount = async (e) => {
        e.preventDefault();
        if (name) {
            try {
                const response = await fetch(userApiUrl, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({ name }),
                });
                const data = await response.json();
                console.log("Success", data);
                fetchAccounts();
                setName("");
            } catch (err) {
                console.error("Error adding account:", err);
            }
        }
    };

    return(
        <div className="container">
            <br/>
            <form onSubmit={handleAddAccount}>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Name</span>
                    <input type="text" name="name" id="name" className="form-control" aria-describedby="addon-wrapping" value={name} placeholder="Network Name" onChange={(e) => {
                            setName(e.target.value);
                        }}/>
                    <button
                        id="button-addon2"
                        type="submit"
                        className="btn btn-secondary"
                    >
                        Add account
                    </button>
                </div>
            </form>
            <form onSubmit={(e) => e.preventDefault()}>
            <table className="table table-hover table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th colSpan="3"></th>
                    </tr>
                </thead>
                <tbody>
                    {accountsContextData.map((currentAccount) => (
                        <tr key={currentAccount.id}>
                            <td>{currentAccount.id}</td>
                            <td>
                                {editingAccountId === currentAccount.id && editingField === 'name' ? (
                                    <input
                                        id="name"
                                        name="name"
                                        value={accountName}
                                        onChange={(e) => setAccountName(e.target.value)}
                                    />
                                ) : (
                                    <span>{currentAccount.name}</span>
                                )}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeleteClick(currentAccount.id)}
                                    className="btn btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleEditClick(currentAccount.id, 'name', currentAccount.name)}
                                    className="btn btn-outline-secondary"
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    disabled={editingAccountId !== currentAccount.id || editingField !== 'name'}
                                    onClick={() => handleSaveClick(currentAccount.id)}
                                    className="btn btn-outline-success"
                                >
                                    Save
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
        </div>
    )
}