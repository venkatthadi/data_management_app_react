import { useEffect } from "react";
import { Header } from "../components/Header";
import { UserTypeContainer } from "../components/usertypes/UsertypeContainer";
import { useAuth } from "../utils/contexts/authContext";
import { useNavigate } from "react-router-dom";

export function UsertypesPage() {

    const { isAuth } = useAuth();
    const nav = useNavigate();

    if(isAuth){
        return(
            <> 
                <Header />
                <div className="container">
                    <UserTypeContainer />
                </div>
            </>
        );
    } else {
        useEffect(() => {
            nav('/login');
        }, [])
    }
}