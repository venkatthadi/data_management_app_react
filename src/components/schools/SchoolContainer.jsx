import { useEffect, useState } from "react";
import { userApiUrl } from "../../main";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/contexts/authContext";

export function SchoolContainer() {

    const [schoolsContextData, setSchoolsContextData] = useState([]);
    const [networksContextData, setNetworksContextData] = useState([]);
    const [name, setName] = useState("");
    const [networkId, setNetworkId] = useState(0);
    const [editingSchoolId, setEditingSchoolId] = useState(null);
    const [editingName, setEditingName] = useState('');
    const [editingNetworkId, setEditingNetworkId] = useState(0);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const fetchSchools = async () => {
        try {
            const response = await fetch(`${userApiUrl}/schools`, {
                headers: { 
                    'Content-Type': 'application/json; charset=UTF-8',
                    'authorization': 'Bearer ' + localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            setSchoolsContextData(data);
            if(data.message === "jwt expired"){
                alert("Token expired. Login again..");
                logout();
                navigate('/login');
            }
        } catch (error) {
            console.error("Error fetching schools data:", error);
        }
    };

    const fetchNetworks = async () => {
        try {
            const response = await fetch(`${userApiUrl}/networks`, {
                headers: { 
                    'Content-Type': 'application/json; charset=UTF-8',
                    'authorization': 'Bearer ' + localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            setNetworksContextData(data);
        } catch (error) {
            console.error("Error fetching networks data:", error);
        }
    };

    useEffect(() => {
        fetchSchools();
        fetchNetworks();
    }, []);

    const handleDeleteClick = async (schoolId) => {
        try {
            await fetch(`${userApiUrl}/schools/${schoolId}`, {
                method: "DELETE",
                headers: { 
                    'Content-Type': 'application/json; charset=UTF-8',
                    'authorization': 'Bearer ' + localStorage.getItem("token"),
                },
            });
            console.log("Delete successful");
            fetchSchools();
        } catch (error) {
            console.error("Error deleting school:", error);
        }
    };

    const handleEditClick = (schoolId, currentName, currentNetworkId) => {
        setEditingSchoolId(schoolId);
        setEditingName(currentName);
        setEditingNetworkId(currentNetworkId);
    };

    const handleSaveClick = (schoolId) => {
        fetch(`${userApiUrl}/schools/${schoolId}`, {
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json; charset=UTF-8',
                'authorization': 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify({ name: editingName, networkId: editingNetworkId }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            fetchSchools();
        })
        .catch((err) => console.log(`Error: ${err}`));

        setEditingSchoolId(null);
        setEditingName('');
        setEditingNetworkId(0);
    };

    const handleAddSchool = async (e) => {
        e.preventDefault();
        if (name && networkId) {
            try {
                const response = await fetch(`${userApiUrl}/schools`, {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json; charset=UTF-8',
                        'authorization': 'Bearer ' + localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ name, networkId }),
                });
                const data = await response.json();
                console.log("Success", data);
                fetchSchools();
                setName("");
                setNetworkId(0);
            } catch (err) {
                console.error("Error adding school:", err);
            }
        }
    };

    const getNetworkNameById = (id) => {
        const network = networksContextData.find(network => network.id === id);
        return network ? network.name : 'Unknown';
    };

    return(
        <div className="container">
            <br/>
            <form onSubmit={handleAddSchool} >
                <div className="field input-group flex-nowrap mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="schoolName">Name</label>
                    </div>
                    <input type="text" name="name" id="schoolName" className="form-control" aria-describedby="addon-wrapping" value={name} placeholder="School Name" onChange={(e) => {
                            setName(e.target.value);
                        }}/>
                </div>
                <div className="field input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="networkSelect">Network</label>
                    </div>
                    <select
                        className="custom-select"
                        id="networkSelect"
                        value={networkId}
                        onChange={(e) => setNetworkId(Number(e.target.value))}
                    >
                        <option value={0} disabled>Choose...</option>
                        {networksContextData.map((network) => (
                            <option key={network.id} value={network.id}>
                                {network.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-secondary"
                >
                    Add school
                </button>
            </form>
            <br/>
            <form onSubmit={(e) => e.preventDefault()}>
            <table className="table table-hover table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Network</th>
                        <th colSpan="4"></th>
                    </tr>
                </thead>
                <tbody>
                    {schoolsContextData.map((currentSchool) => (
                        <tr key={currentSchool.id}>
                            <td>{currentSchool.id}</td>
                            <td>
                                {editingSchoolId === currentSchool.id ? (
                                    <input
                                        id="name"
                                        name="name"
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                    />
                                ) : (
                                    <span>{currentSchool.name}</span>
                                )}
                            </td>
                            <td>
                                {editingSchoolId === currentSchool.id ? (
                                    <select
                                        value={editingNetworkId}
                                        onChange={(e) => setEditingNetworkId(Number(e.target.value))}
                                    >
                                        {networksContextData.map((network) => (
                                            <option key={network.id} value={network.id}>
                                                {network.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span>{getNetworkNameById(currentSchool.networkId)}</span>
                                )}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeleteClick(currentSchool.id)}
                                    className="btn btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleEditClick(currentSchool.id, currentSchool.name, currentSchool.networkId)}
                                    className="btn btn-outline-secondary"
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    disabled={editingSchoolId !== currentSchool.id}
                                    onClick={() => handleSaveClick(currentSchool.id)}
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