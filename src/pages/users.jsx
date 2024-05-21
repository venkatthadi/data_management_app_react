import { Header } from "../components/Header";
import { UserContainer } from "../components/users/UserContainer";
import { useAuth } from "../utils/contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function UsersPage() {

    const { isAuth } = useAuth();
    const nav = useNavigate();

    if(isAuth){
        return(
            <> 
                <Header />
                <div className="container">
                    <UserContainer />
                </div>
            </>
        );
    } else {
        useEffect(() => {
            nav('/login');
        }, [])
    }
}