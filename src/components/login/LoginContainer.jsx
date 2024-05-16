import { useState, useEffect, useContext } from "react";
import { userApiUrl } from "../../main";
import { TokenContext } from "../../utils/contexts/authContext";

export function LoginContainer() {

    const { isAuth, setIsAuth, token, setToken } = useContext(TokenContext);
    
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const fetchAuth = async (user, pass) => {
        try {
            const auth = await fetch(`${userApiUrl}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ username: user, password: pass }),
            })
            const data = await auth.json();
            alert(`${data.message}`)
            if(data.accessToken){
                setToken(data.accessToken);
                console.log(`Token: ${token}`);
                setIsAuth(true);
            }
            // console.log(data.accessToken);
        } catch(err) {
            console.log(err);
            setIsAuth(false);
        }
    }

    return (
        <div className="jumbotron" style={{backgroundColor: "#DFDFDF" }}>
            <div className="field input-group flex-nowrap mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="addon-wrapping">Username: </span>
                </div>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Username" 
                    aria-describedby="addon-wrapping"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
            </div>
            <div className=" field input-group flex-nowrap mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="addon-wrapping">Password: </span>
                </div>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    aria-describedby="addon-wrapping"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </div>
            <center>
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        fetchAuth(username, password)
                    }}
                >
                    Log In
                </button>
            </center>
        </div>
    );
}