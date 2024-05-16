import { useEffect, useState } from "react";
import { userApiUrl } from "../../main";

export function UserTypeContainer() {
    
    const [userTypesContextData, setUserTypesContextData] = useState([]);
    const [name, setName] = useState("");
    const [editingUserTypeId, setEditingUserTypeId] = useState(null);
    const [editingField, setEditingField] = useState('');
    const [userTypeName, setUserTypeName] = useState('');

    const fetchUserTypes = async () => {
        try {
            const response = await fetch(`${userApiUrl}/usertypes`);
            const data = await response.json();
            setUserTypesContextData(data);
        } catch (error) {
            console.error("Error fetching user types data:", error);
        }
    };

    useEffect(() => {
        fetchUserTypes();
    }, []);

    const handleDeleteClick = async (userTypeId) => {
        try {
            await fetch(`${userApiUrl}/usertypes/${userTypeId}`, {
                method: "DELETE",
            });
            console.log("Delete successful");
            fetchUserTypes();
        } catch (error) {
            console.error("Error deleting user type:", error);
        }
    };

    const handleEditClick = (userTypeId, field, currentValue) => {
        setEditingUserTypeId(userTypeId);
        setEditingField(field);
        setUserTypeName(currentValue);
    };

    const handleSaveClick = (userTypeId) => {
        fetch(`${userApiUrl}/usertypes/${userTypeId}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ name: userTypeName }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            fetchUserTypes();
        })
        .catch((err) => console.log(`error: ${err}`));

        setEditingUserTypeId(null);
        setEditingField('');
        setUserTypeName('');
    };

    const handleAddUserType = async (e) => {
        e.preventDefault();
        if (name) {
            try {
                const response = await fetch(`${userApiUrl}/usertypes`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({ name }),
                });
                const data = await response.json();
                console.log("Success", data);
                fetchUserTypes();
                setName("");
            } catch (err) {
                console.error("Error adding user type:", err);
            }
        }
    };

    return(
        <div className="container">
            <br/>
            <form onSubmit={handleAddUserType}>
                <div className="input-group flex-nowrap">
                    <div className="input-group-prepend">
                        <label className="input-group-text">Name</label>
                    </div>
                    <input type="text" name="name" id="name" className="form-control" aria-describedby="addon-wrapping" value={name} placeholder="User Type Name" onChange={(e) => {
                            setName(e.target.value);
                        }}/>
                    <button
                        id="button-addon2"
                        type="submit"
                        className="btn btn-secondary"
                    >
                        Add User Type
                    </button>
                </div>
            </form>
            <br/>
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
                    {userTypesContextData.map((currentUserType) => (
                        <tr key={currentUserType.id}>
                            <td>{currentUserType.id}</td>
                            <td>
                                {editingUserTypeId === currentUserType.id && editingField === 'name' ? (
                                    <input
                                        id="name"
                                        name="name"
                                        value={userTypeName}
                                        onChange={(e) => setUserTypeName(e.target.value)}
                                    />
                                ) : (
                                    <span>{currentUserType.name}</span>
                                )}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeleteClick(currentUserType.id)}
                                    className="btn btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleEditClick(currentUserType.id, 'name', currentUserType.name)}
                                    className="btn btn-outline-secondary"
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    disabled={editingUserTypeId !== currentUserType.id || editingField !== 'name'}
                                    onClick={() => handleSaveClick(currentUserType.id)}
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
