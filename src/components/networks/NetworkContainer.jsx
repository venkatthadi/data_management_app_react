import { useEffect, useState } from "react";
import { userApiUrl } from "../../main";

export function NetworkContainer() {
    
    const [networksContextData, setNetworksContextData] = useState([]);
    const [accountsContextData, setAccountsContextData] = useState([]);
    const [name, setName] = useState("");
    const [aid, setAid] = useState(0);
    const [editingNetworkId, setEditingNetworkId] = useState(null);
    const [editingName, setEditingName] = useState('');
    const [editingAccountId, setEditingAccountId] = useState(0);

    const fetchNetworks = async () => {
        try {
            const response = await fetch(`${userApiUrl}/networks`);
            const data = await response.json();
            setNetworksContextData(data);
        } catch (error) {
            console.error("Error fetching networks data:", error);
        }
    };

    const fetchAccounts = async () => {
        try {
            const response = await fetch(`${userApiUrl}/accounts`);
            const data = await response.json();
            setAccountsContextData(data);
        } catch (error) {
            console.error("Error fetching accounts data:", error);
        }
    };

    useEffect(() => {
        fetchNetworks();
        fetchAccounts();
    }, []);

    const handleDeleteClick = async (networkId) => {
        try {
            await fetch(`${userApiUrl}/networks/${networkId}`, {
                method: "DELETE",
            });
            console.log("Delete successful");
            fetchNetworks();
        } catch (error) {
            console.error("Error deleting network:", error);
        }
    };

    const handleEditClick = (networkId, currentName, currentAccountId) => {
        setEditingNetworkId(networkId);
        setEditingName(currentName);
        setEditingAccountId(currentAccountId);
    };

    const handleSaveClick = (networkId) => {
        fetch(`${userApiUrl}/networks/${networkId}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ name: editingName, accountId: editingAccountId }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            fetchNetworks();
        })
        .catch((err) => console.log(`Error: ${err}`));

        setEditingNetworkId(null);
        setEditingName('');
        setEditingAccountId(0);
    };

    const handleAddNetwork = async (e) => {
        e.preventDefault();
        if (name && aid) {
            try {
                const response = await fetch(`${userApiUrl}/networks`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({ name, accountId: aid }),
                });
                const data = await response.json();
                console.log("Success", data);
                fetchNetworks();
                setName("");
                setAid(0);
            } catch (err) {
                console.error("Error adding network:", err);
            }
        }
    };

    const getAccountNameById = (id) => {
        const account = accountsContextData.find(account => account.id === id);
        return account ? account.name : 'Unknown';
    };

    return(
        <div className="container">
            <br/>
            <form onSubmit={handleAddNetwork} >
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Name</span>
                    <input type="text" name="name" id="name" className="form-control" aria-describedby="addon-wrapping" value={name} placeholder="Network Name" onChange={(e) => {
                            setName(e.target.value);
                        }}/>
                </div>
                <div className="field input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Account</label>
                    </div>
                    <select
                        className="custom-select"
                        id="inputGroupSelect01"
                        value={aid}
                        onChange={(e) => setAid(Number(e.target.value))}
                    >
                        <option value={0} disabled>Choose...</option>
                        {accountsContextData.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-secondary"
                >
                    Add network
                </button>
            </form>
            <br/>
            <form onSubmit={(e) => e.preventDefault()}>
            <table className="table table-hover table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>A ID</th>
                        <th colSpan="4"></th>
                    </tr>
                </thead>
                <tbody>
                    {networksContextData.map((currentNetwork) => (
                        <tr key={currentNetwork.id}>
                            <td>{currentNetwork.id}</td>
                            <td>
                                {editingNetworkId === currentNetwork.id ? (
                                    <input
                                        id="name"
                                        name="name"
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                    />
                                ) : (
                                    <span>{currentNetwork.name}</span>
                                )}
                            </td>
                            <td>
                                {editingNetworkId === currentNetwork.id ? (
                                    <select
                                        value={editingAccountId}
                                        onChange={(e) => setEditingAccountId(Number(e.target.value))}
                                    >
                                        {accountsContextData.map((account) => (
                                            <option key={account.id} value={account.id}>
                                                {account.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span>{getAccountNameById(currentNetwork.accountId)}</span>
                                )}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeleteClick(currentNetwork.id)}
                                    className="btn btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleEditClick(currentNetwork.id, currentNetwork.name, currentNetwork.accountId)}
                                    className="btn btn-outline-secondary"
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    disabled={editingNetworkId !== currentNetwork.id}
                                    onClick={() => handleSaveClick(currentNetwork.id)}
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