import { useEffect, useState } from "react";
import { userApiUrl } from "../../main";

export function UserContainer() {

    const [usersContextData, setUsersContextData] = useState([]);
    const [schoolsContextData, setSchoolsContextData] = useState([]);
    const [userTypesContextData, setUserTypesContextData] = useState([]);
    const [name, setName] = useState("");
    const [schoolId, setSchoolId] = useState(0);
    const [usertypeId, setUsertypeId] = useState(0);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingName, setEditingName] = useState('');
    const [editingSchoolId, setEditingSchoolId] = useState(0);
    const [editingUsertypeId, setEditingUsertypeId] = useState(0);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${userApiUrl}/users`);
            const data = await response.json();
            setUsersContextData(data);
        } catch (error) {
            console.error("Error fetching users data:", error);
        }
    };

    const fetchSchools = async () => {
        try {
            const response = await fetch(`${userApiUrl}/schools`);
            const data = await response.json();
            setSchoolsContextData(data);
        } catch (error) {
            console.error("Error fetching schools data:", error);
        }
    };

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
        fetchUsers();
        fetchSchools();
        fetchUserTypes();
    }, []);

    const handleDeleteClick = async (userId) => {
        try {
            await fetch(`${userApiUrl}/users/${userId}`, {
                method: "DELETE",
            });
            console.log("Delete successful");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEditClick = (userId, currentName, currentSchoolId, currentUsertypeId) => {
        setEditingUserId(userId);
        setEditingName(currentName);
        setEditingSchoolId(currentSchoolId);
        setEditingUsertypeId(currentUsertypeId);
    };

    const handleSaveClick = (userId) => {
        fetch(`${userApiUrl}/users/${userId}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ name: editingName, schoolId: editingSchoolId, usertypeId: editingUsertypeId }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            fetchUsers();
        })
        .catch((err) => console.log(`Error: ${err}`));

        setEditingUserId(null);
        setEditingName('');
        setEditingSchoolId(0);
        setEditingUsertypeId(0);
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (name && schoolId && usertypeId) {
            try {
                const response = await fetch(`${userApiUrl}/users`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({ name, schoolId, usertypeId }),
                });
                const data = await response.json();
                console.log("Success", data);
                fetchUsers();
                setName("");
                setSchoolId(0);
                setUsertypeId(0);
            } catch (err) {
                console.error("Error adding user:", err);
            }
        }
    };

    const getSchoolNameById = (id) => {
        const school = schoolsContextData.find(school => school.id === id);
        return school ? school.name : 'Unknown';
    };

    const getUserTypeNameById = (id) => {
        const userType = userTypesContextData.find(userType => userType.id === id);
        return userType ? userType.name : 'Unknown';
    };

    return(
        <div className="container">
            <br/>
            <form onSubmit={handleAddUser} >
                <div className="input-group flex-nowrap">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="userName">Name</label>
                    </div>
                    <input type="text" name="name" id="userName" className="form-control" aria-describedby="addon-wrapping" value={name} placeholder="User Name" onChange={(e) => {
                            setName(e.target.value);
                        }}/>
                </div>
                <div className="field input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="schoolSelect">School</label>
                    </div>
                    <select
                        className="custom-select"
                        id="schoolSelect"
                        value={schoolId}
                        onChange={(e) => setSchoolId(Number(e.target.value))}
                    >
                        <option value={0} disabled>Choose...</option>
                        {schoolsContextData.map((school) => (
                            <option key={school.id} value={school.id}>
                                {school.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="userTypeSelect">User Type</label>
                    </div>
                    <select
                        className="custom-select"
                        id="userTypeSelect"
                        value={usertypeId}
                        onChange={(e) => setUsertypeId(Number(e.target.value))}
                    >
                        <option value={0} disabled>Choose...</option>
                        {userTypesContextData.map((userType) => (
                            <option key={userType.id} value={userType.id}>
                                {userType.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-secondary"
                >
                    Add user
                </button>
            </form>
            <br/>
            <form onSubmit={(e) => e.preventDefault()}>
            <table className="table table-hover table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>School</th>
                        <th>User Type</th>
                        <th colSpan="4"></th>
                    </tr>
                </thead>
                <tbody>
                    {usersContextData.map((currentUser) => (
                        <tr key={currentUser.id}>
                            <td>{currentUser.id}</td>
                            <td>
                                {editingUserId === currentUser.id ? (
                                    <input
                                        id="name"
                                        name="name"
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                    />
                                ) : (
                                    <span>{currentUser.name}</span>
                                )}
                            </td>
                            <td>
                                {editingUserId === currentUser.id ? (
                                    <select
                                        value={editingSchoolId}
                                        onChange={(e) => setEditingSchoolId(Number(e.target.value))}
                                    >
                                        {schoolsContextData.map((school) => (
                                            <option key={school.id} value={school.id}>
                                                {school.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span>{getSchoolNameById(currentUser.schoolId)}</span>
                                )}
                            </td>
                            <td>
                                {editingUserId === currentUser.id ? (
                                    <select
                                        value={editingUsertypeId}
                                        onChange={(e) => setEditingUsertypeId(Number(e.target.value))}
                                    >
                                        {userTypesContextData.map((userType) => (
                                            <option key={userType.id} value={userType.id}>
                                                {userType.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span>{getUserTypeNameById(currentUser.usertypeId)}</span>
                                )}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeleteClick(currentUser.id)}
                                    className="btn btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleEditClick(currentUser.id, currentUser.name, currentUser.schoolId, currentUser.usertypeId)}
                                    className="btn btn-outline-secondary"
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    disabled={editingUserId !== currentUser.id}
                                    onClick={() => handleSaveClick(currentUser.id)}
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
